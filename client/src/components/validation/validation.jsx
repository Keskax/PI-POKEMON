export default function validateForm(input) {
  const errors = {};

  if (!input.name) {
    errors.name = "Name is required";
  } else if (!/^[a-zA-Z\s]+$/.test(input.name)) {
    errors.name = "The name cannot contain numbers";
  }

  if (!input.type) {
    errors.name = "Type is required";
  }

  if (!input.image) {
    errors.image = "Image is required";
  }

  const errorNum = ["attack", "defense", "hp"];

  errorNum.forEach((value) => {
    if (input[value] === "" || isNaN(input[value]) || input[value] < 0) {
      errors[value] = ` ${value} is required`;
    }
  });

  return errors;
}
