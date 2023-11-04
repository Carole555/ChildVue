<template>
  <div class="list">
    <h1>我的任务</h1>
    <div class="course-grid" @click="toTask">
      <div v-for="task in pagedCourses" :key="task.id" class="course-card" @click="navigateToCourse(task.id)">
        <div class="course-label" :style="{ backgroundColor: task.required ? 'yellow' : 'green', color: task.required ? 'red' : 'black' }">
          {{ task.required ? '待批改' : '已完成' }}
        </div>
        <img :src="task.image" alt="Course Image" class="course-image" />
        <h2 class="course-title">{{ task.name }}</h2>
        <p class="course-description">{{ task.description }}</p>
      </div>
    </div>
    <div class="pagination">
      <button @click="previousPage" :disabled="currentPage === 1">上一页</button>
      <button @click="nextPage" :disabled="currentPage === totalPages">下一页</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tasks: [
        {
          id: 1,
          name: 'Mathematics',
          image: '/static/img/fullstack.jpg',
          description: 'Learn the fundamentals of mathematics and solve complex problems.',
          required: true // Added required property
        },
        {
          id: 2,
          name: 'Science',
          image: '/static/img/fullstack.jpg',
          description: 'Explore the fascinating world of science and conduct experiments.',
          required: false // Added required property
        },
        {
          id: 6,
          name: 'Science',
          image: '/static/img/fullstack.jpg',
          description: 'Explore the fascinating world of science and conduct experiments.',
          required: false // Added required property
        },
        {
          id: 3,
          name: 'Science',
          image: '/static/img/fullstack.jpg',
          description: 'Explore the fascinating world of science and conduct experiments.',
          required: false // Added required property
        },
        {
          id: 4,
          name: 'Science',
          image: '/static/img/fullstack.jpg',
          description: 'Explore the fascinating world of science and conduct experiments.',
          required: false // Added required property
        },
        {
          id: 5,
          name: 'Science',
          image: '/static/img/fullstack.jpg',
          description: 'Explore the fascinating world of science and conduct experiments.',
          required: false // Added required property
        }
        // Add more courses here...
      ],
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
    navigateToCourse (tasksId) {
      // Redirect to the course page for the selected course
      this.$router.push(`/Tasks/${tasksId}`)
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
}
</script>

<style scoped>
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

