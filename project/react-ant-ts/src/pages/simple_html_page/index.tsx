alert('This is a simple demo page without react!');
console.log('This is a simple demo page without react!');

//--------------------------------------------------
// demo for .env.production or .env.development file 
//--------------------------------------------------
alert(process.env.REACT_VAR_PUBLIC_URL);


if (process.env.NODE_ENV === 'production') {
    alert('production');
}

if (process.env.NODE_ENV === 'development') {
    alert('development');
}
