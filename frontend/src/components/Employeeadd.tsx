import { Box, Button, Paper } from '@mui/material';
import Link from 'next/link';
import { ArrowBackOutlined, PersonAddOutlined } from '@mui/icons-material';

export function EmployeeAdd() {
    return (
      <Paper
      sx={{
        width: '100%',
      display: "flex",
      flexDirection: "column",
      gap: 2,
      flex: 1,
      p: 2,
      }}
    >
        <Box marginBottom={2} display="flex" gap={2}>
            <Link href="/" passHref>
                <Button startIcon={<ArrowBackOutlined />} variant="outlined">
                    社員一覧に戻る
                </Button>
            </Link>
            <Link href="/new" passHref>
                <Button 
                    startIcon={<PersonAddOutlined />} 
                    variant="contained" 
                    color="primary"
                >
                    新規社員登録
                </Button>
            </Link>
        </Box>
      </Paper>
    );
}