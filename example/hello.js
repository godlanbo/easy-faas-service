module.exports = async function(params, context) {
  console.log('Received params:', params);
  return {
    message: params.msg,
  };
}