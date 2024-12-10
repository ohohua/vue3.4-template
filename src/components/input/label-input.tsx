import type { CSSProperties } from "vue";

// 类型定义
interface renderInputProps {
  label: string;
}

// 组件定义
const labelInput = (
  props: renderInputProps = {
    label: "",
  },
) => {
  const { label } = props;

  const boxStyle: CSSProperties = {
    padding: "5px 15px",
    display: "flex",
    alignItems: "center",
    color: "#d5d5d5",
    backgroundColor: "#fff",
    border: "1px solid #d5d5d5",
    borderRadius: "15px",
    margin: "10px 0",
  };

  const pdStyle: CSSProperties = {
    paddingRight: "10px",
  };

  const labelStyle: CSSProperties = {
    ...pdStyle,
    color: "#333",
  };
  const inputValue = "";
  const inputData = (val: void) => {};
  return (
    <>
      <div style={boxStyle}>
        <span style={labelStyle}>{label}</span>
        <span style={pdStyle}>|</span>
        <input style="flex: 1;" placeholder={`请输入${label}`} onInput={inputData} />
      </div>
    </>
  );
};

export default labelInput;
