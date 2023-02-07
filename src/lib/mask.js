const isPrivate = (str) => {
  return (
    /.*password.*/.test(str) || /.*email.*/.test(str) || /.*phone.*/.test(str)
  );
};

const walk = (obj) => {
  const copy = Object.assign({}, obj);
  const keys = Object.keys(copy);

  keys.forEach((key) => {
    const value = copy[key];

    if (typeof value === "object") {
      copy[key] = walk(value);
    }

    if (isPrivate(key)) {
      copy[key] = "*****";
    }
  });

  return copy;
};

class Mask {
  constructor(logger) {
    this.logger = logger;
  }

  info() {
    const maskedArgs = walk(arguments);
    return this.logger.info(maskedArgs);
  }
}

export default Mask;
