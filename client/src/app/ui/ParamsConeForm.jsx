import { useEffect, useState } from "react";
import TextField from "../components/common/form/textField";
import { useDispatch, useSelector } from "react-redux";
import { validator } from "../utils/validator";
import { createCone, getCone, getErrorCone } from "../store/cone";

const ParamsConeForm = () => {
  const [data, setData] = useState({
    r: "",
    h: "",
    n: "",
  });

  const cone = useSelector(getCone());
  const coneErrors = useSelector(getErrorCone());
  const dispath = useDispatch();
  const [errors, setErrors] = useState({});

  const [isOverlap, setOverlap] = useState(false);

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const validatorConfig = {
    r: {
      isRequired: {
        message: "Radius required",
      },
      isOnlyDigit: {
        message: "Only digit",
      },
      isOnlyNumbersGreaterThan0: {
        message: "Only numbers greater than 0",
      },
    },
    h: {
      isRequired: {
        message: "Height required",
      },
      isOnlyDigit: {
        message: "Only digit",
      },
      isOnlyNumbersGreaterThan0: {
        message: "Only numbers greater than 0",
      },
    },
    n: {
      isRequired: {
        message: "Enter number of segments on a circle required",
      },
      isOnlyDigit: {
        message: "Only digit",
      },
      isOnlyNumbersGreaterThan3: {
        message: "Only numbers greater than 3",
      },
    },
  };

  useEffect(() => {
    validate();
    overlap();
  }, [data]);

  function overlap() {
    if (
      cone &&
      cone.params.r === Number(data.r) &&
      cone.params.h === Number(data.h) &&
      cone.params.n === Number(data.n)
    ) {
      setOverlap(true);
    } else {
      setOverlap(false);
    }
  }

  function validate() {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    dispath(
      createCone({
        r: Number(data.r),
        h: Number(data.h),
        n: Number(data.n),
      })
    );
    setOverlap(true);
  };
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Enter radius"
        name="r"
        value={data.r}
        onChange={handleChange}
        error={errors.r}
      />
      <TextField
        label="Enter height"
        name="h"
        value={data.h}
        onChange={handleChange}
        error={errors.h}
      />
      <TextField
        label="Enter number of segments on a circle"
        name="n"
        value={data.n}
        onChange={handleChange}
        error={errors.n}
      />

      {coneErrors && <p className="text-danger">{coneErrors}</p>}

      <button
        type="submit"
        disabled={!isValid || isOverlap}
        className="btn btn-primary w-100 mx-auto"
      >
        Create cone
      </button>
    </form>
  );
};

export default ParamsConeForm;
