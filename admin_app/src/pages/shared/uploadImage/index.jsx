import React, { useState } from "react";
import axios from "axios";
import styles from "./style.less";

import { Upload, Progress } from "antd";

const UploadImage = props => {
    const { getImgUrl, imgUrl } = props;
	const [defaultFileList, setDefaultFileList] = useState([]);
	const [progress, setProgress] = useState(0);

	const uploadImage = async options => {
		const { onSuccess, onError, file, onProgress } = options;

		const fmData = new FormData();
		const config = {
			headers: { "content-type": "multipart/form-data" },
			onUploadProgress: event => {
				const percent = Math.floor((event.loaded / event.total) * 100);
				setProgress(percent);
				if (percent === 100) {
					setTimeout(() => setProgress(0), 1000);
				}
				onProgress({ percent: (event.loaded / event.total) * 100 });
			}
		};
		fmData.append("image", file);
		try {
			const res = await axios.post(
				"http://localhost:6165/api/Upload/upload-image",
				fmData,
				config
			);

			onSuccess("Ok");
			console.log("server res: ", res);
            getImgUrl(res.data.imgUrl);
		} catch (err) {
			console.log("Eroor: ", err);
			const error = new Error("Some error");
			onError({ err });
		}
	};

	const handleOnChange = ({ file, fileList, event }) => {
		console.log(file, fileList, event);
		//Using Hooks to update the state to the current filelist
		setDefaultFileList(file);
		//filelist - [{uid: "-1",url:'Some url to image'}]
	};

	return (
        <div className={styles.container}>
            <Upload
                accept="image/*"
                multiple={false}
                customRequest={uploadImage}
                onChange={handleOnChange}
                listType="picture-card"
                disabled={defaultFileList.length > 0}
                defaultFileList={defaultFileList}
                className={styles.avatarUploader}
                onProgress={({ percent }) => {
                  console.log("progre...", percent);
                  if (percent === 100) {
                    setTimeout(() => setProgress(0), 1000);
                  }
                  return setProgress(Math.floor(percent));
                }} 
            >
                {defaultFileList.length >= 1 || imgUrl ? null : <div>Upload Button</div>}
                {defaultFileList.length == 0 && imgUrl && <img src={imgUrl} alt="avatar" style={{ width: '100%' }} />}
            </Upload>
            {progress > 0 ? <Progress percent={progress} /> : null}
        </div>
	);
};

export default UploadImage;