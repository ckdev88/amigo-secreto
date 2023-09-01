import {
	Form,
	LabeledTextField,
	Card,
	InputWithSubmitButton,
} from "@everybody-gives/ui"; // TODO: lokaal trekken, zodat ze aangepast/debugged kunnen worden
import { useState } from "react";
import { supabase } from "../supabase";

export const NewGroupForm = () => {
	const [groupName, setGroupName] = useState("");
	const [yourName, setYourName] = useState("");
	const [members, setMembers] = useState<string[]>([]);
	const submitFormIntoDatabase = async function() {
		const { data, error: groupError } = await supabase
			.from("as_groups")
			.insert({
				name: groupName,
				created_by: yourName,
			})
			.select("id")
			.single();
		if (groupError) {
			console.error(groupError);
			return;
		}
		if (!data) {
			console.error("No data returned");
			return;
		}

		const { error: creatorError } = await supabase
			.from("as_members")
			.insert({ name: yourName, selected_by: null, group_id: data.id });
		if (creatorError) {
			console.error('creatorError: ', creatorError);
		}
		const { error: membersError } = await supabase
			.from("as_members")
			.insert(
				members.map(name => ({
					name,
					selected_by: null,
					group_id: data.id,
				}))
			);
		if (membersError) {
			console.error('membersError: ', membersError);
			return;
		}
		window.location.href = `/${data.id}?user=${yourName}`;
	}


	return (
		<Form
			submitError={null}
			formTitle="Amigo Secreto"
			submitText="VAMOS"
			onSubmit={submitFormIntoDatabase}
		>
			<LabeledTextField
				name="name"
				label="Grupo de amigos"
				placeholder="Festa 2023"
				value={groupName}
				onChange={(e) => setGroupName(e.target.value)}
			/>
			<LabeledTextField
				name="createdBy"
				label="Seu nome"
				placeholder="Reginaldo"
				value={yourName}
				onChange={
					(e) => setYourName(e.target.value)
				}
			/>
			<hr />
			<h3 className="mt-1 text-xl font-black tracking-tight text-gray-700 text-center">
				Festadors
			</h3>
			<InputWithSubmitButton
				onSubmit={(value) => {
					setMembers((prev) => [...prev, value]);
				}}
			/>
			<div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
				{members.map((memberName, personIdx) => (
					<Card
						className="bg-background"
						key={personIdx}
						title={memberName}
						onDelete={() => {
							setMembers((prev) => prev.filter((m) => m !== memberName));
						}}
					/>
				))}
			</div>
		</Form>
	);
};
