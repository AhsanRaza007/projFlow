import React from 'react';
import { Button, Box, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Project, ProjectCreate, ProjectUpdate } from '@/types/projects';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import TextFieldWithTooltip from '@/components/forms/FormTextFieldWithTooltip';
import DatePickerWithTooltip from '@/components/forms/FormDatePickerWithTooltip';

const ProjectForm: React.FC<{
  project?: Project;
  onSubmit: (projectData: ProjectCreate | ProjectUpdate) => Promise<void>;
  onBackBtnClick?: () => void;
  submitButtonText: string;
}> = ({ project, onSubmit, submitButtonText, onBackBtnClick }) => {
  const {
    control,
    formState: { isValid, isDirty, isSubmitting },
    handleSubmit,
    getValues,
  } = useForm<ProjectCreate | ProjectUpdate>({
    defaultValues: {
      name: project?.name ?? '',
      description: project?.description ?? '',
      startDate: project?.startDate ?? '',
      endDate: project?.endDate ?? '',
      projectManager: project?.projectManager ?? '',
    },
    mode: 'onChange',
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        display={'flex'}
        flexDirection={'column'}
        gap={2}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextFieldWithTooltip
          control={control}
          name="name"
          rules={{ required: 'Project Name is required' }}
          label="Project Name"
        />

        <TextFieldWithTooltip
          control={control}
          name="description"
          rules={{ required: 'Project Description is required' }}
          label="Description"
          multiline={4}
        />

        <Grid container spacing={2}>
          <Grid size={{ md: 6, xs: 12 }}>
            <DatePickerWithTooltip
              control={control}
              name="startDate"
              rules={{ required: 'Start Date is required' }}
              label="Start Date"
            />
          </Grid>
          <Grid size={{ md: 6, xs: 12 }}>
            <DatePickerWithTooltip
              control={control}
              name="endDate"
              rules={{
                required: 'End Date is required',
                validate: (value: string) => {
                  const startDateValue = getValues('startDate');
                  if (startDateValue && value && dayjs(value).isBefore(dayjs(startDateValue))) {
                    return 'End Date must be after Start Date';
                  }
                  return true;
                },
              }}
              label="End Date"
            />
          </Grid>
        </Grid>

        <TextFieldWithTooltip
          control={control}
          name="projectManager"
          rules={{ required: 'Project Manager is required' }}
          label="Project Manager"
        />

        <Box mt={3}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={!isValid || !isDirty || isSubmitting}
          >
            {isSubmitting ? 'submitting...' : submitButtonText}
          </Button>
          {onBackBtnClick && (
            <Button
              variant="outlined"
              color="secondary"
              onClick={onBackBtnClick}
              sx={{ marginLeft: 2 }}
            >
              Back
            </Button>
          )}
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default ProjectForm;
