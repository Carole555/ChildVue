<template>
  <div class="list">
    <h1>我的任务</h1>
    <div class="course-grid">
      <div v-for="course in pagedCourses" :key="course.id" class="course-card" @click="navigateToCourse(course.id)">
        <div class="course-label" :style="{ backgroundColor: course.required ? 'yellow' : 'green', color: course.required ? 'red' : 'black' }">
          {{ course.required ? '待批改' : '已完成' }}
        </div>
        <img :src="course.image" alt="Course Image" class="course-image" />
        <h2 class="course-title">{{ course.name }}</h2>
        <p class="course-description">{{ course.description }}</p>
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
      courses: [
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
      currentPage: 1,
      coursesPerPage: 10
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
