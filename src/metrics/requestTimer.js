export const requestTimer = (req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;

    console.log(
      JSON.stringify({
        type: "request",
        method: req.method,
        path: req.originalUrl,
        status: res.statusCode,
        duration_ms: duration,
      })
    );
  });

  next();
};
