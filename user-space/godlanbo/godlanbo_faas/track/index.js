module.exports = async function(params, context) {
  console.log('Track Received params:', params);
  return {
    message: params.msg,
  };
}