<template>
  <div class="list">
    <div class="my-task">
      <el-row>
        <el-button  class="my-task-button" @click="toMyTask" type="primary" plain>我的任务</el-button>
      </el-row>
    </div>


    <h1>全部任务</h1>
    <div class="search-bar">
      <el-row type="flex" justify="center" align="middle">

        <el-col>
          <el-input v-model="searchTerm" placeholder="输入搜索内容" class="search-input" style="float: left; margin-left: 30px"></el-input>
        </el-col>
        <el-col>
          <el-button @click="search" class="search-button" type="primary" icon="el-icon-search">搜索</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="course-grid">
      <div v-for="course in pagedCourses" :key="course.id" class="course-card" @click="navigateToCourse(course.id)">
        <div class="course-label" :style="{ backgroundColor: course.is_must_do ? 'green' : 'yellow', color: course.is_must_do ? 'white' : 'black' }">
          {{ course.is_must_do ? 1 : 0 }}
        </div>
        <img :src="course.task_photo" alt="Course Image" class="course-image" />
        <h2 class="course-title">{{ course.name }}</h2>
        <p class="course-description">{{ course.content }}</p>
      </div>
    </div>
    <div class="pagination">
      <button @click="previousPage" :disabled="currentPage === 1">上一页</button>
      <button @click="nextPage" :disabled="currentPage === totalPages">下一页</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Cookies from 'js-cookie'

export default {
  data () {
    return {
      courses: [],
      currentPage: 1,
      coursesPerPage: 10
    }
  },
  watch: {
    /**
     * @params 监听参数变化重新获取数据
     * */
    params: {
      handler () {
        this.showall()
      },
      deep: true
    }
  },
  computed: {
    totalPages () {
      return Math.ceil(this.courses.length / this.coursesPerPage)
    },
    pagedCourses () {
      const startIndex = (this.currentPage - 1) * this.coursesPerPage
      const endIndex = startIndex + this.coursesPerPage
      return this.courses.slice(startIndex, endIndex)
    }
  },
  methods: {
    showall () {
      axios.post('http://localhost:8080/children/task/showAll', null)
        .then(response => {
          this.modal_loading = false
          if (response.data.code === '666') {
            this.$Message.success('成功!')
            Cookies.set('token', response.data.token)
            this.courses = response.data
          } else {
            this.$Message.error('失败!')
          }
        })
        .catch(error => {
          this.modal_loading = false
          console.error('失败:', error)
        })
    },
    navigateToCourse (courseId) {
      // Redirect to the course page for the selected course
      this.$router.push(`/course/${courseId}`)
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
    toMyTask () {
      this.$router.push('/icon')
    }
  }
}
</script>

<style scoped>

.my-task {
  display: flex;
  justify-content: flex-end;
  top: 28px; /* 距离容器顶部的距离 */
  right: 10px; /* 距离容器右侧的距离 */
}
.my-task-button {
  position: absolute;
  top: 40px; /* 距离容器顶部的距离 */
  right: 10px; /* 距离容器右侧的距离 */
}
.list {
  text-align: center;
  margin-top: 50px;
}
.search-bar {
  display: flex;
}

.search-input {
  margin-right: 10px; /* 调整输入框和按钮之间的间距 */
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
