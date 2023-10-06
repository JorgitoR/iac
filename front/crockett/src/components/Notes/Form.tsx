import { CreateFile, Input, SideModal, Spinner, TextArea } from 'common'
import { useFormik } from 'formik'
import moment from 'moment'
import { useCreateNotes } from 'services/notes/CreateNotes'
import { useUpdateNotes } from 'services/notes/UpdateNotes'
import { useNoteById } from 'services/notes/getNotesAndFiles'
/* import * as Yup from 'yup' */

interface IProps {
	heading: string
	setOpen: (open: boolean) => void
	formType: 'create' | 'update'
	open: boolean
	id: string | number
	type: string
	noteID: string | number
}

interface IinitialValues {
	notes: string
	fileType: string
	fileDescription: string
	createdDate: string
	fileUrl: string
}

export const NotesForm = ({
	heading,
	setOpen,
	formType,
	open,
	id,
	type,
	noteID,
}: IProps) => {
	const { UpdateNotes } = useUpdateNotes()
	const { CreateNotes } = useCreateNotes()
	const { data: note_data, isLoading: note__loading } = useNoteById(noteID)

	const initialValues: IinitialValues = {
		notes: note_data?.notes || '',
		fileType: note_data?.fileType || '',
		fileDescription: note_data?.fileDescription || '',
		createdDate: note_data?.createdDate || '',
		fileUrl: note_data?.fileUrl || '',
	}
	/* 
	const validationSchema = Yup.object({
		type: Yup.string().required('Type is required'),
		task_ids: Yup.array().required('Required').min(1, 'Task is required'),
		job_id: Yup.string().required('Job is required'),
		team_leader_id: Yup.string().required('Team Leader is required'),
		staff_ids: Yup.array().required('Required').min(1, 'Staff is required'),
	}) */

	const formik = useFormik({
		initialValues,
		enableReinitialize: true,
		onSubmit: async (values, { setSubmitting }) => {
			if (!noteID) {
				const payload = {
					notes: values.notes,
					[type + '_id']: id,
					fileType: values.fileType,
					fileDescription: values.fileDescription,
					createdDate: moment().format('DD/MM/YYYY'),
					fileUrl: values.fileUrl,
				}
				await CreateNotes(payload)
			}
			if (noteID) {
				const payload = {
					notes: values.notes,
					[type + '_id']: id,
					fileType: values.fileType,
					fileDescription: values.fileDescription,
					createdDate: moment().format('DD/MM/YYYY'),
					fileUrl: values.fileUrl,
				}
				await UpdateNotes(payload, noteID)
			}
			setSubmitting(false)
			formik.resetForm()
			setOpen(false)
		},
	})

	if (note__loading) {
		return <Spinner />
	}

	return (
		<>
			<SideModal
				heading={heading}
				open={open}
				setOpen={setOpen}
				handleSubmit={formik.handleSubmit}
				isLoading={formik.isSubmitting}
				formType={formType}>
				<div className="">
					<div className="">
						<Input
							title="File Type"
							placeholder="File Type"
							id="fileType"
							type="text"
							error={formik.errors.fileType}
							value={formik.values.fileType}
							handleChange={formik.handleChange}
							handleBlur={formik.handleBlur}
						/>
					</div>
					<div className="">
						<Input
							title="File Description"
							placeholder="File Description"
							id="fileDescription"
							type="text"
							error={formik.errors.fileDescription}
							value={formik.values.fileDescription}
							handleChange={formik.handleChange}
							handleBlur={formik.handleBlur}
						/>
					</div>
					<TextArea
						title="Notes"
						id="notes"
						type="text"
						error={formik.errors.notes}
						value={formik.values.notes}
						handleChange={formik.handleChange}
						handleBlur={formik.handleBlur}
					/>
					<CreateFile
						field="fileUrl"
						setFieldValue={formik.setFieldValue}
						value={formik.values.fileUrl}
					/>
				</div>
			</SideModal>
		</>
	)
}
