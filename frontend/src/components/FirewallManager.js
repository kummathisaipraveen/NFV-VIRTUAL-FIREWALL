import React, { useState, useEffect } from "react";
import { TextField, Button, Select, MenuItem, Table, TableBody, TableCell, TableHead, TableRow, FormControl, InputLabel, Typography } from "@mui/material";

const API_URL = "http://localhost:5000";

export default function FirewallManager() {
  const [port, setPort] = useState("");
  const [action, setAction] = useState("ACCEPT");
  const [rules, setRules] = useState([]);

  const fetchRules = async () => {
    const res = await fetch(`${API_URL}/list_rules`);
    const data = await res.json();
    setRules(data.rules);
  };

  const addRule = async () => {
    await fetch(`${API_URL}/add_rule`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ port, action }),
    });
    setPort("");
    fetchRules();
  };

  const deleteRule = async (port) => {
    await fetch(`${API_URL}/delete_rule`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ port }),
    });
    fetchRules();
  };

  useEffect(() => {
    fetchRules();
  }, []);

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Manage Firewall Rules
      </Typography>

      <FormControl fullWidth margin="normal">
        <TextField
          label="Port Number"
          value={port}
          onChange={(e) => setPort(e.target.value)}
        />
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel>Action</InputLabel>
        <Select
          value={action}
          onChange={(e) => setAction(e.target.value)}
        >
          <MenuItem value="ACCEPT">Allow</MenuItem>
          <MenuItem value="DROP">Block</MenuItem>
        </Select>
      </FormControl>

      <Button
        variant="contained"
        color="primary"
        onClick={addRule}
        style={{ marginTop: 10 }}
      >
        Add Rule
      </Button>

      <Typography variant="h6" style={{ marginTop: 20 }}>
        Current Rules:
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Port</TableCell>
            <TableCell>Action</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rules.map((r, i) => (
            <TableRow key={i}>
              <TableCell>{r.port}</TableCell>
              <TableCell>{r.action}</TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => deleteRule(r.port)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
