const routeNotFound = (req, res)=>{
  res.status(404).send('Route does not exists')
}

module.exports = routeNotFound