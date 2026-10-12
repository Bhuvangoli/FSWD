
function Product(props) {
  return (
    <div>
      <h3>Product Name: {props.name}</h3>
      <p>Price: ₹{props.price}</p>
      <p>Category: {props.category}</p>
      <hr />
    </div>
  );
}

export default Product;
