<template>
  <div class="page-container">
    <div class="content-container">
      <h1 class="title">标题</h1>
      <div class="video-container">
        <!-- 在这里放置视频 -->
        <video src="../../../static/video/demo.mp4" width="2000" height="320"  controls></video>
      </div>
      <div class="requirements">
        <h2>视频要求：</h2>
        <p>视频要求的详细描述内容...</p>
      </div>
      <div class="submission-container">
        <h2>提交部分</h2>
        <div class="submission">
          <div class="upload-container">
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList"
              list-type="picture">
              <el-button size="small" type="primary" @change="handleFileUpload">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </div>
          <el-row>
            <el-button  @click="submit" type="primary" plain>确认提交</el-button>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      file: null
    }
  },
  methods: {
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },

    handleFileUpload (event) {
      this.file = event.target.files[0]
      console.log(event.target.files)
    },
    submit () {
      // 处理提交逻辑
      // 可以在这里执行跳转到新界面的操作
      if (this.file) {
        // 文件已上传
        console.log('File uploaded:', this.file)
      } else {
        // 没有文件被上传
        console.log('No file uploaded.')
      }
    }

  }
}
</script>
<style>
.upload-container {
  text-align: left;
}

.page-container {
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.content-container {
  width: 80%;
  padding: 20px;
  background-color: white;
}

.title {
  text-align: center;
}

.video-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.requirements {
  margin-top: 20px;
}

.submission-container {
  margin-top: 20px;
}

.submission {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}

.file-input-container {
  display: flex;
  align-items: center;
}

.file-label {
  margin-right: 10px;
}

.image-input,
.video-input {
  display: none;
}

.submit-button-container {
  text-align: right;
}

.submit-button {
  padding: 10px 20px;
  background-color: #c0e4f7;
  color: white;
  border: none;
}
</style>
