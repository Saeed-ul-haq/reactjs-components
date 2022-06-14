/* eslint-disable */
import { Card, Form, message, Progress, Upload } from "antd";
import DownloadIcon from "images/svg/download.svg";
import createProject from "libs/utils/project-apis/create-project-api";
import { fileUpload } from "libs/utils/project-apis/file-upload-apis";
import { get, isEmpty } from "lodash";
import { Fragment, useRef, useState } from "react";
import AllFilesList from "./files-list";
import "./style.scss";

export default function CreateProject(props) {
  const [taglist, settaglist] = useState([]);
  const [fileUrl, setfileUrl] = useState("");
  const [defaultMapFile, setdefaultMapFile] = useState("");
  const [fileName, setfileName] = useState("");
  const [achiveFiles, setArchiveFiles] = useState("");
  const [editId, setEditId] = useState("");
  const [projectFiles, setProjectsFiles] = useState([]);
  const [uploading, setuploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [zipFileName, setZipFileName] = useState("");
  const tagInput = useRef(null);
  const [editmode, setEditMode] = useState(true);
  const [tag, setTag] = useState("");
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    if (!isEmpty(editId) && editmode) {
      const data = {
        ...values,
        tags: taglist.join(),
        credits:
          typeof values.credits === "string"
            ? values.credits
            : values.credits.join(),
        imageUrl: fileUrl,
        mapFile: fileName,
      };
      await onProjectUpdate(data);
      window.location.href = "/projects";
    } else {
      const data = {
        ...values,
        tags: !isEmpty(taglist) && taglist.join(),
        credits: !isEmpty(values.credits) && values.credits.join(),
        imageUrl: fileUrl,
      };
      const res = await createProject({ data });
      const { id } = res;
      await uploadZipFile(id);
      form.resetFields();
      window.location.href = "/projects";
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const { Dragger } = Upload;

  const addTagHandler = (e) => {
    e.preventDefault();
    const { tags } = form.getFieldsValue(["tags"]);
    setTag(tags);
    const Newtags = [...taglist, tags];
    settaglist(Newtags);
    form.setFieldsValue({ tags: "" });
    setTag("");
  };

  const handleArchives = ({ file }) => {
    setArchiveFiles(file);
    file && setZipFileName(file.name);
  };

  const onUploadFile = async ({ file }) => {
    const url = `/fm/upload?bucket=gisfe&share_with=sys:anonymous,sys:authenticated&meta={"fm":{"group":"target-qais-file-group","source":"energy"}}`;

    const res = await fileUpload({ files: file, url });
    if (res.status === 200) {
      const { data } = res;
      setfileUrl(data.files[0]["url"]);
    } else {
      message.error({ content: "error while uploading file" });
    }
  };
  const showProgress = (progressEvent) => {
    const uploadPercentage = Math.trunc(
      (progressEvent.loaded / progressEvent.total) * 100
    );
    setUploadProgress(uploadPercentage);
  };
  const uploadZipFile = async (projectId) => {
    const baseUrl = "/spatial/api/v1/catalog";
    const url = `${baseUrl}/qgis/projects/${projectId}/archive`;
    setuploading(true);
    await fileUpload({
      key: "file",
      files: achiveFiles,
      url,
      onUploadProgress: showProgress,
    })
      .then((res) => {
        if (res.status === 200) {
          message.success({
            content: res.message || "Project created successfully",
          });
        } else {
          message.error({
            content: res.message || "error while uploading file",
          });
        }
        setuploading(false);
      })
      .catch((err) => {
        message.error({ content: err.message || "error while uploading file" });
        setuploading(false);
      });
  };

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
              <div style={{ marginBottom: "10px" }}>
                {isEmpty(fileUrl) ? (
                  <Dragger
                    accept={[".png", ".jpg", ".jpeg", ".pjp"]}
                    multiple={false}
                    customRequest={onUploadFile}
                  >
                    <p className="ant-upload-drag-icon">
                      <img src={DownloadIcon} />
                    </p>
                    <p className="ant-upload-text">
                      Drop your cover image her , or <a>Select Image</a>
                    </p>
                  </Dragger>
                ) : (
                  <div className="map-cover-img">
                    <img src={`${PRODUCT_APP_URL_API}/fm${fileUrl}`} />
                  </div>
                )}
              </div>

              <div style={{ marginBottom: "10px" }}>
                {editmode ? (
                  <AllFilesList
                    filesData={projectFiles}
                    onfilesSelectChange={(fileName) => setfileName(fileName)}
                    defaultValue={defaultMapFile}
                  />
                ) : (
                  <Dragger
                    accept={[
                      ".geojson",
                      ".kbl",
                      ".kml",
                      ".kmz",
                      ".json",
                      ".csv",
                      ".gpx",
                      ".dxf",
                      ".pdf",
                      ".xlsx",
                      ".json",
                      ".dwg",
                      ".png",
                      "jpg",
                      ".zip",
                      ".rar",
                    ]}
                    multiple={true}
                    customRequest={handleArchives}
                    showUploadList={false}
                  >
                    <p className="ant-upload-drag-icon">
                      <img src={DownloadIcon} />
                    </p>
                    <p className="ant-upload-text">
                      Select Zip File from server
                    </p>
                    <p>{zipFileName}</p>
                  </Dragger>
                )}
              </div>
            </Form>
          </div>
        </Card>
        {uploading && (
          <div className="upload-progress">
            <Progress className="progress-bar" percent={uploadProgress} />
          </div>
        )}
      </div>
    </Fragment>
  );
}
