export default function validateForm(input) {
  const errors = {};

  if (!input.name) {
    errors.name = "Name is required";
  } else if (!/^[a-zA-Z\s]+$/.test(input.name)) {
    errors.name = "The name cannot contain numbers";
  }

  if (!input.image) {
    errors.image = "Image is required";
  }

  const numberFields = ["attack", "defense"];

  numberFields.forEach((field) => {
    if (input[field] === "" || isNaN(input[field]) || input[field] < 0) {
      errors[field] = ` ${field} is required`;
    }
  });

  return errors;
}
