export const adminAuth = (req, res, next) => {
  const token = "xyz";
  const isAuthorized = token === "xyz";

  if (!isAuthorized) {
    res.status(401).send("Unauthorised access");
  } else {
    next();
  }
};

export const userAuth = (req, res, next) => {
  const token = "xyz";
  const isAuthorized = token === "xyz";

  if (!isAuthorized) {
    res.status(401).send("Unauthorised access");
  } else {
    next();
  }
};
