<template>
  <div class="page-container">
    <div class="content-container">
      <h1 class="title">任务名称</h1>
      <div class="status">
        <h2>状态：</h2>
      <img src="../../../static/img/wait.png" width=30px height=30px >
      <p>待批改</p></div>
      <div class="requirements">
        <h2>任务详情：</h2>
        <p>任务的详细描述内容...</p>
      </div>
      <div class="submission-container">
        <h2>提交详情</h2>
            <div class="img-container">
              <!-- 提交图片 -->
              <img src="../../../static/img/fullstack.jpg" width="500" height="320"  controls>
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
.status {
  display: flex; /* 使用flexbox布局 */
  align-items: center; /* 垂直居中对齐 */
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

.img-container {
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
