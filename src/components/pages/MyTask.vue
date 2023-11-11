<template>
  <div class="page-container">
    <div class="my-task">
      <el-row>
        <el-button  class="my-task-button" @click="toMyTask" icon="el-icon-arrow-left" type="primary" plain>返回</el-button>
      </el-row>
    </div>
    <div class="content-container">
      <h1 class="title">{{task.name}}</h1>
      <div class="status">
        <h2>状态：</h2>
        <img src="/static/img/wait.png" width=30px height=30px >
        <p>{{ task.isCorrected === 0 ? '待批改' : task.isCorrected === 1 ? '未通过' :task.isCorrected === 2 ? '已通过' : '' }}</p></div>
      <div class="requirements">
        <h2>任务详情：</h2>
        <p>{{task.content}}</p>
      </div>
      <div class="submission-container">
        <h2>提交详情</h2>
        <div class="img-container">
          <!-- 提交图片 -->
          <img :src="task.homeworkPhoto" alt="Image" class="image">
          <i class="el-icon-download icon" @click="downloadImage"></i>
        </div>
      </div>
      <div class="requirements" v-if='task.isCorrected === 2 ||task.isCorrected === 1'>
        <h2>评价：</h2>
        <p>{{ task.comment }}</p>
      </div>
      <div class="button-container">
      <el-button type="primary" v-if='task.isCorrected === 1' @click="toFilter">重新提交<i class="el-icon-upload el-icon--right"></i></el-button>
      </div>
    </div>
  </div>
</template>
<script>
import {defineComponent} from 'vue'
import axios from 'axios'
// import Cookies from 'js-cookie'
import {getUser} from '../../common/utils'
export default defineComponent({
  mounted () {
    this.showall()
  },
  data () {
    return {
      task: {
        isCorrected: '',
        name: '',
        taskPhoto: '',
        content: '',
        homeworkPhoto: '',
        comment: ''
      }
    }
  },
  methods: {
    downloadImage () {
      const childId = getUser().id
      const taskId = this.$route.query.tasksId
      // axios.get(`http://localhost:8080/children/file/downloadTaskChildPhoto/${childId}/${taskId}`)
      //   .then(response => {
      //     if (response.data.success) {
      //       this.$Message.success('成功!')
      //       console.log('成功')
      //     } else {
      //       this.$Message.error('啊啊啊啊')
      //     }
      //   })
      //   .catch(error => {
      //     this.loading = false
      //     console.error('失败:', error)
      //   })
      this.$alert(`http://localhost:8080/children/file/downloadTaskChildPhoto/${childId}/${taskId}`, '下载链接', {
        confirmButtonText: '确定',
        callback: action => {
          this.$message({
            type: 'info',
            message: `action: ${action}`
          })
        }
      })
    },
    toFilter () {
      const courseId = this.$route.query.tasksId
      this.$router.push({name: 'filter', query: {courseId, isToo: 'yes'}})
    },
    toMyTask () {
      this.$router.push('/Tasks')
    },
    showall () {
      const childId = getUser().id
      const taskId = this.$route.query.tasksId
      axios.get(`http://localhost:8080/children/criticism/criticismDetails/${childId}/${taskId}`)
        .then(response => {
          this.loading = false
          if (response.data.success) {
            // this.$Message.success('成功!')
            // Cookies.set('token', response.data.token)
            this.task.isCorrected = response.data.data[0].isCorrected
            this.task.name = response.data.data[0].name
            this.task.taskPhoto = response.data.data[0].taskPhoto
            this.task.content = response.data.data[0].content
            this.task.homeworkPhoto = response.data.data[0].homeworkPhoto
            this.task.comment = response.data.data[0].comment
            console.log('响应', response.data.data[0].name)
            console.log(' this.task', this.task)
          } else {
            this.$Message.error('失败!')
          }
        })
        .catch(error => {
          this.loading = false
          console.error('失败:', error)
        })
    }
  }
})
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
.my-task-button {
  position: absolute;
  top: -300px; /* 距离容器顶部的距离 */
  right: -900px; /* 距离容器右侧的距离 */
}
.my-task {
  display: flex;
  justify-content: flex-end;
  top: -300px; /* 距离容器顶部的距离 */
  right: -900px; /* 距离容器右侧的距离 */
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
  position: relative;
}

.requirements {
  margin-top: 20px;
}

.image {
  width: 500px;
  height: 320px;
  position: relative;
  float: left;
  margin-left: -376px;
}
.submission-container {
  margin-top: 20px;
}
.button-container {
  display: flex;
  margin-top: 20px;
  justify-content: flex-start;
}

.icon {
  position: absolute;
  font-size: 24px;
  bottom: 0;
  right: 330px;
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
