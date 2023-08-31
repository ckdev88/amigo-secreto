import {
	Form,
	LabeledTextField,
	Card,
	InputWithSubmitButton,
} from "@everybody-gives/ui";
import { useState } from "react";
import { supabase } from "../supabase";

export const NewGroupForm = () => {
	const [groupName, setGroupName] = useState("");
	const [yourName, setYourName] = useState("");
	const [members, setMembers] = useState<string[]>([]);

	return (
		<Form
			submitError={null}
			formTitle="Amigo Secreto"
			submitText="VAMOS"
			onSubmit={async () => {
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
				const { error: membersError } = await supabase
					.from("as_members")
					.insert(
						members.map((name) => ({
							name,
							selected_by: null,
							group_id: data.id,
						}))
					);

				if (membersError) {
					console.log("yey?");
					console.error(membersError);
					return;
				}

				window.location.href = `/${data.id}?user=${yourName}`;
			}}
		>
			<LabeledTextField
				name="name"
				label="Group Name"
				placeholder="Festa 2023"
				value={groupName}
				onChange={(e) => setGroupName(e.target.value)}
			/>
			<LabeledTextField
				name="createdBy"
				label="Nome"
				placeholder="Reginaldo"
				value={yourName}
				onChange={(e) => setYourName(e.target.value)}
			/>
			<hr />
			<h3 className="mt-1 text-xl font-black tracking-tight text-gray-700 text-center">
				Group members
			</h3>
			<InputWithSubmitButton
				onSubmit={(value) => {
					setMembers((prev) => [...prev, value]);
				}}
			/>
			<ul className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
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
			</ul>
		</Form>
	);
};
