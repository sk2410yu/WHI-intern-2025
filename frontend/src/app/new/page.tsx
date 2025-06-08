import { EmployeeForm } from '@/components/EmployeeFrom';
import { GlobalContainer } from '@/components/GlobalContainer';
import { Typography } from '@mui/material';

export default function NewEmployeePage() {
    return (
        <GlobalContainer subtitle="社員追加">
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 'medium', color: 'text.primary' }}>
            </Typography>
            <EmployeeForm />
        </GlobalContainer>
    );
}