export default function CreateProject(props) {
  const { Option } = Select;
  return (
    <Fragment>
      <div className="create-project-container">
        <Card>
          <div className="step-container">
            <Form
              form={form}
              name="basic"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                name="name"
                rules={[
                  { required: true, message: "please input Project Name" },
                ]}
              >
                <FloatInputLabel
                  label=" Project Name"
                  placeholder="name"
                  value={form.getFieldsValue(["name"])}
                  type="text"
                />
              </Form.Item>

              <Form.Item
                name="description"
                rules={[
                  {
                    required: true,
                    message: "please input Project Description",
                  },
                ]}
              >
                <FloatTextArealabel
                  type="textarea"
                  label=" Project Description"
                  placeholder="Project Description"
                  className="text-area-field"
                  value={form.getFieldsValue(["name"])}
                />
              </Form.Item>
            </Form>
          </div>
        </Card>
      </div>
    </Fragment>
  );
}
