#!/usr/bin/env python3
"""
Calculator logic — receives: a, b, operator via CLI args
Returns: JSON result to stdout
"""
import sys
import json

def calculate(a, b, operator):
    try:
        a = float(a)
        b = float(b)

        if operator == '+':
            result = a + b
        elif operator == '-':
            result = a - b
        elif operator == '*':
            result = a * b
        elif operator == '/':
            if b == 0:
                return {"error": "Division by zero"}
            result = a / b
        elif operator == '%':
            if b == 0:
                return {"error": "Modulo by zero"}
            result = a % b
        elif operator == '**':
            result = a ** b
        else:
            return {"error": f"Unknown operator: {operator}"}

        # Return int if result is whole number
        if result == int(result):
            result = int(result)

        return {"result": result}

    except ValueError:
        return {"error": "Invalid numbers provided"}
    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    if len(sys.argv) != 4:
        print(json.dumps({"error": "Usage: calculator.py <a> <b> <operator>"}))
        sys.exit(1)

    a, b, operator = sys.argv[1], sys.argv[2], sys.argv[3]
    output = calculate(a, b, operator)
    print(json.dumps(output))
