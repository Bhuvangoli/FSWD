
function Error_Component() {
  throw new Error('Intentional error for testing');

  return <h2>This message will not be displayed.</h2>;
}

export default Error_Component;
