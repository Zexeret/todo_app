export const buildRoute = (handlerFun) => async (req, res) => {
  try {
    const data = await handlerFun(req,res);

    res.status(200).send(data);
  } catch (error) {
    if (error.status) res.status(error.status).send(error.message);
    else res.status(500).send(error);
  }
};

