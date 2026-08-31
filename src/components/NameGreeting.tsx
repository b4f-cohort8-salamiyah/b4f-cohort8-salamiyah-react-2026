interface NameGreetingProps {
  name: string;
}

function NameGreeting(props: NameGreetingProps) {
  let greetingMessage: string = "";
  if (props.name == "admin") {
    greetingMessage = "Welcome back, admin.";
  } else {
    greetingMessage =
      "Hello, " + props.name[0].toUpperCase() + props.name.slice(1) + "!";
  }
  console.log(greetingMessage);
  return <p className="name-greeting-feedback">{greetingMessage}</p>;
}

export default NameGreeting;
