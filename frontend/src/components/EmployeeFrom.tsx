"use client"
import { useState } from 'react';
import { TextField, Button, Box, Paper, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Link from 'next/link';
import { ArrowBackOutlined } from '@mui/icons-material';

export function EmployeeForm() {

    /** ★ 会社で使う選択肢を API で取る場合は SWR 等に置き換えてください */
    const departments = [
        { value: "",          label: "すべての所属" },
        { value: "営業部",     label: "営業部" },
        { value: "開発部",     label: "開発部" },
        { value: "人事部",     label: "人事部" },
    ];

    const positions = [
        { value: "",        label: "すべての役職" },
        { value: "一般",     label: "一般" },
        { value: "マネージャー", label: "マネージャー" },
        { value: "役員",     label: "役員" },
    ];

    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [affiliation, setAffiliation] = useState('');
    const [post, setPost] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/employees', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name:name,
                    age: parseInt(age, 10),
                    affiliation: affiliation,
                    post: post
                })
            });

            if (!response.ok) {
                throw new Error('Failed to create employee');
            }

            setName('');
            setAge('');
            setAffiliation('')
            setPost('')
        } catch (error) {
            console.error('Error creating employee:', error);
        }
    };

    return (
        <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4, mb: 4 }}>
            <Paper elevation={0} sx={{ p: 4, backgroundColor: 'white' }}>
                <Box component="form" onSubmit={handleSubmit}>
                    <Typography variant="h6" sx={{ mb: 3 }}>追加社員情報</Typography>
                    <TextField
                        fullWidth
                        label="名前"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        margin="normal"
                        required
                    />
                    <TextField
                        fullWidth
                        label="年齢"
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        margin="normal"
                        required
                    />
                    <FormControl fullWidth margin="normal" required>
                        <InputLabel id="affiliation-label">所属</InputLabel>
                        <Select
                            labelId="affiliation-label"
                            value={affiliation}
                            label="所属"
                            onChange={(e) => setAffiliation(e.target.value)}
                        >
                            {departments.map((dept) => (
                                <MenuItem key={dept.value} value={dept.value}>
                                    {dept.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="normal" required>
                        <InputLabel id="post-label">役職</InputLabel>
                        <Select
                            labelId="post-label"
                            value={post}
                            label="役職"
                            onChange={(e) => setPost(e.target.value)}
                        >
                            {positions.map((pos) => (
                                <MenuItem key={pos.value} value={pos.value}>
                                    {pos.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Link href="/" passHref>
                            <Button 
                                startIcon={<ArrowBackOutlined />} 
                                sx={{ 
                                    color: 'text.secondary',
                                    '&:hover': {
                                        backgroundColor: 'transparent',
                                        color: 'text.primary'
                                    }
                                }}
                            >
                                社員一覧に戻る
                            </Button>
                        </Link>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            sx={{
                                px: 4,
                                '&:hover': {
                                    backgroundColor: 'primary.dark'
                                }
                            }}
                        >
                            登録する
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
}