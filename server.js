const express = require('express');
const { spawn } = require('child_process');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * POST /api/calculate
 * Body: { a: number, b: number, operator: string }
 * Calls Python script and returns result
 */
app.post('/api/calculate', (req, res) => {
  const { a, b, operator } = req.body;

  // --- Validation ---
  if (a === undefined || b === undefined || !operator) {
    return res.status(400).json({ error: 'Missing fields: a, b, operator are required.' });
  }

  const allowedOps = ['+', '-', '*', '/', '%', '**'];
  if (!allowedOps.includes(operator)) {
    return res.status(400).json({ error: `Invalid operator. Allowed: ${allowedOps.join(' ')}` });
  }

  const scriptPath = path.join(__dirname, 'python', 'calculator.py');

  // --- Spawn Python process ---
  const py = spawn('python3', [scriptPath, String(a), String(b), operator]);

  let stdout = '';
  let stderr = '';

  py.stdout.on('data', (data) => { stdout += data.toString(); });
  py.stderr.on('data', (data) => { stderr += data.toString(); });

  py.on('close', (code) => {
    if (code !== 0 || stderr) {
      console.error('Python error:', stderr);
      return res.status(500).json({ error: 'Python script failed.', detail: stderr });
    }

    try {
      const parsed = JSON.parse(stdout.trim());

      if (parsed.error) {
        return res.status(400).json({ error: parsed.error });
      }

      return res.json({
        a: Number(a),
        b: Number(b),
        operator,
        result: parsed.result,
      });

    } catch (e) {
      return res.status(500).json({ error: 'Failed to parse Python output.', raw: stdout });
    }
  });
});

/**
 * GET /api/health
 */
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'express-calculator' });
});

// Serve index.html for all other routes (Express 5 compatible wildcard)
app.get('/*splat', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`\n✓ Calculator API running at http://localhost:${PORT}`);
  console.log(`  REST endpoint: POST http://localhost:${PORT}/api/calculate`);
  console.log(`  UI:            http://localhost:${PORT}\n`);
});