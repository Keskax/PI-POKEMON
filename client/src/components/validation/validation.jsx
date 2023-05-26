export default function validateForm(input) {
  const errors = {};

  if (!input.name) {
    errors.name = "🔺Name is required";
  } else if (!/^[a-zA-Z\s]+$/.test(input.name)) {
    errors.name = "🔺The name cannot contain numbers";
  }

  if (!input.type) {
    errors.type = "🔺Type is required";
  }

  if (!input.image) {
    errors.image = "🔺Image is required";
  }

  const errorNum = ["attack", "defense", "hp"];

  errorNum.forEach((value) => {
    if (input[value] === "" || isNaN(input[value])) {
      errors[value] = `🔺${value} is required`;
    } else if (input[value] < 0 || input[value] > 200) {
      errors[value] = `🔺${value} must be a number between 1 and 200`;
    }
  });

  return errors;
}
