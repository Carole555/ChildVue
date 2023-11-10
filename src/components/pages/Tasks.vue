<template>
  <div class="list">
    <div class="my-task">
      <el-row>
        <el-button  class="my-task-button" @click="toAllTask" icon="el-icon-arrow-left" type="primary" plain>返回</el-button>
      </el-row>
    </div>
    <h1>我的任务</h1>
    <div class="course-grid" @click="toTask">
      <div v-for="task in pagedCourses" :key="task.id" class="course-card" @click="navigateToCourse(task.id)">
        <div class="course-label" :style="{ backgroundColor: task.is_corrected === 0 ? 'yellow' : task.is_corrected === 1 ? 'green': task.is_corrected === 2 ? 'red':'', color: task.is_corrected === 0 ? 'red' : task.is_corrected === 1 ? 'black':task.is_corrected === 2 ? 'white':'' }">
          {{ task.is_corrected === 0 ? '待批改' : task.is_corrected === 1 ? '未通过' :task.is_corrected === 2 ? '已通过' : '' }}
        </div>
        <img :src="task.taskPhoto" alt="Course Image" class="course-image" />
        <h2 class="course-title">{{ task.name }}</h2>
        <p class="course-description">{{ task.content }}</p>
        <div class="completed-count">
          <i class="fas fa-user" style="color: lightgray;"></i> 已完成人数为：{{task.completedNum}}
        </div>
      </div>
    </div>
    <div class="pagination">
      <button @click="previousPage" :disabled="currentPage === 1">上一页</button>
      <button @click="nextPage" :disabled="currentPage === totalPages">下一页</button>
    </div>
  </div>
</template>

<script>
import {getUser} from '../../common/utils'
import axios from 'axios'
import Cookies from 'js-cookie'
import {defineComponent} from 'vue'

export default defineComponent({
  mounted () {
    this.showall()
  },
  data () {
    return {
      tasks: [],
      created () {
        // 在组件创建时获取课程数据，可以使用课程的ID参数从后端或其他数据源获取课程详细信息
        this.fetchCourseData()
      },
      currentPage: 1,
      coursesPerPage: 10
    }
  },
  computed: {
    totalPages () {
      return Math.ceil(this.tasks.length / this.coursesPerPage)
    },
    pagedCourses () {
      const startIndex = (this.currentPage - 1) * this.coursesPerPage
      const endIndex = startIndex + this.coursesPerPage
      return this.tasks.slice(startIndex, endIndex)
    }
  },
  methods: {
    showall () {
      console.log('调用了 showData 方法')
      const hasChild = this.$route.query.hasChild
      console.log('页面Child :', hasChild)
      const childId = getUser().id
      console.log(childId)
      // 确保 childId 的值有效
      this.loading = true
      axios.get(`http://localhost:8080/children/task-child/viewMyTasks/${childId}`, {})
        .then(response => {
          this.loading = false
          if (response.data.success) {
            this.$Message.success('成功!')
            Cookies.set('token', response.data.token)
            this.tasks = response.data.data
            console.log(this.tasks)
          } else {
            this.$Message.error('失败!')
          }
        })
        .catch(error => {
          this.loading = false
          console.error('失败:', error)
        })
    },
    toAllTask () {
      this.$router.push('/Course')
    },
    navigateToCourse (tasksId) {
      // Redirect to the course page for the selected course
      console.log(tasksId)
      this.$router.push({name: 'myTask', query: {tasksId}})
    },
    previousPage () {
      if (this.currentPage > 1) {
        this.currentPage--
      }
    },
    nextPage () {
      if (this.currentPage < this.totalPages) {
        this.currentPage++
      }
    },
    toTask () {
      this.$router.push('/MyTask')
    },
    fetchCourseData () {
      // 从后端或其他数据源获取课程数据，并将其赋值给course对象
      // 示例中使用异步函数来模拟获取数据的过程
      // 可以根据实际情况进行调整
      const taskId = this.$route.params.taskId // 获取课程ID参数
      // 发起异步请求获取课程数据
      // 示例中使用setTimeout模拟异步请求
      setTimeout(() => {
        // 假设课程数据存储在response中
        const response = {
          id: taskId,
          name: '课程名称',
          image: '/static/img/course.jpg',
          description: '课程描述'
          // 其他课程属性
        }
        this.task = response
      }, 500)
    }
  }
})
</script>

<style scoped>
.my-task-button {
  position: absolute;
  top: 1px; /* 距离容器顶部的距离 */
  right: 1px; /* 距离容器右侧的距离 */
}
.my-task {
  display: flex;
  justify-content: flex-end;
  top: 10px; /* 距离容器顶部的距离 */
  right: 10px; /* 距离容器右侧的距离 */
}
.list {
  text-align: center;
  margin-top: 50px;
}

.course-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.course-card {
  width: 230px;
  margin: 10px;
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  position: relative;
}

.course-card:hover {
  background-color: #e0e0e0;
}

.course-label {
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 5px;
  background-color: #ffa500;
  color: white;
  border-radius: 5px;
  font-size: 17px;
}
.completed-count {
  text-align: left;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-start; /* 将 justify-content 设置为 flex-start */
  gap: 5px;
}
.course-label {
  padding: 5px 10px;
  border-radius: 5px;
  font-weight: bold;
}

.required {
  background-color: green;
  color: white;
}

.optional {
  background-color: yellow;
  color: black;
}

.required {
  background-color: #ffa500;
}

.optional {
  background-color: #ffa500;
}

.course-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 5px;
}

.course-title {
  margin-top: 10px;
}

.course-description {
  margin-top: 5px;
  font-size: 14px;
}

.pagination {
  margin-top: 20px;
}

.pagination button {
  margin: 0 5px;
}
</style>

