<template>
  <div class="page-container">
    <div class="content-container">
      <h1 class="title">{{courses.name}}</h1>
      <div class="video-container">
        <!-- 在这里放置视频 -->
        <video :src="courses.video" width="2000" height="320"  controls></video>
      </div>
      <div class="requirements">
        <h2>视频要求：</h2>
        <p>{{ courses.content }}</p>
      </div>
      <div class="submission-container">
        <h2>提交部分</h2>
        <div class="submission">
          <div class="upload-container">
            <input type="file" ref="fileInput" @change="handleFileUpload" style="display: none" accept="image/jpeg, image/png">
              <el-button size="small" type="primary" @click="openFileInput">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </div>
          <el-row>
            <el-button  @click="submit" type="primary" plain>确认提交</el-button>
          </el-row>
        </div>
      </div>
      <div v-for="file in fileList" :key="file.uid">
        <img :src="file.url" style="max-width: 200px; max-height: 200px;" />
        <div>文件名: {{ file.name }}</div>
        <div>文件大小: {{ formatFileSize(file.size) }}</div>
      </div>
    </div>
    </div>
</template>
<script>
import axios from 'axios'
import Cookies from 'js-cookie'
import {defineComponent} from 'vue'
import {getUser} from '../../common/utils'
export default defineComponent({
  mounted () {
    const id = this.$route.query.courseId
    console.log('id :', id)
    this.showall()
  },
  data () {
    return {
      id: null,
      courses: null,
      fileList: []
    }
  },
  methods: {
    openFileInput () {
      // 打开文件选择对话框
      this.$refs.fileInput.click()
    },
    showall () {
      const id = this.$route.query.courseId
      console.log('idid :', id)
      axios.get(`http://localhost:8080/children/task/QueryOneTask/${id}`, {})
        .then(response => {
          this.loading = false
          if (response.data.code === '666') {
            // this.$Message.success('成功!')
            Cookies.set('token', response.data.token)
            this.courses = response.data.data
            console.log(this.courses)
          } else {
            this.$Message.error('失败!')
          }
        })
        .catch(error => {
          this.loading = false
          console.error('失败:', error)
        })
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },

    handleFileUpload (event) {
      const files = event.target.files
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const url = URL.createObjectURL(file)
        this.fileList.push({ name: file.name, size: file.size, url })
      }
    },
    submit () {
      // 处理提交逻辑
      // 可以在这里执行跳转到新界面的操作
      const file = new FormData()
      this.fileList.forEach((filel) => {
        // 将文件内容添加到FormData中
        file.append('file', filel.raw)
      })
      const childId = getUser().id
      const taskId = this.$route.query.courseId
      // 发送FormData到后端
      // 使用axios或其他HTTP库发送POST请求
      axios.post(`http://localhost:8080/children/file/uploadTaskChildPhoto`, null, {
        params: {
          childId,
          taskId,
          file
        }
      })
        .then((response) => {
          // 请求成功处理逻辑
          console.log(response.data)
        })
        .catch((error) => {
          // 请求失败处理逻辑
          console.error(error)
        })
    },
    formatFileSize (size) {
      // 格式化文件大小
      if (size < 1024) {
        return size + 'B'
      } else if (size < 1024 * 1024) {
        return (size / 1024).toFixed(2) + 'KB'
      } else {
        return (size / (1024 * 1024)).toFixed(2) + 'MB'
      }
    }

  }
})
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
