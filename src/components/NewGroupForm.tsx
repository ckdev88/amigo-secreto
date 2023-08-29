import { Form, LabeledTextField, Card, InputWithSubmitButton } from '@everybody-gives/ui';
import { useState } from 'react';

export const NewGroupForm = () => {
	const [groupName, setGroupName] = useState('')
	const [yourName, setYourName] = useState('')
	const [members, setMembers] = useState<string[]>([])

	return (
		<Form submitError={null}
			formTitle='New Group'
			submitText='CREATE'
			onSubmit={() => { // TODO: create new group and members in supabase
			}}>
			<LabeledTextField name="name" label="Group Name" placeholder='my-party-2023' value={groupName} onChange={e => setGroupName(e.target.value)}
			/>
			<LabeledTextField name='createdBy' label="your name" placeholder='carla'
				value={yourName}
				onChange={e => setYourName(e.target.value)}
			/>
			<hr />
			<h3>Group members</h3>
			<InputWithSubmitButton 
			onSubmit={(value) => { 
			setMembers(prev => [...prev, value])}}
			/>
			<ul className='grid grid-cols-2 gap-6 sm:grid-cols-3'>
				{members.map((memberName, personIdx) => (
					<Card
						className='bg-background'
						key={personIdx}
						title={memberName}
						onDelete={() => { setMembers(prev => prev.filter(m => m === memberName)) }}
					/>
				))}
			</ul>
		</Form>
	)
}
