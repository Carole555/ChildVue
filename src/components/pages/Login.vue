<template>
  <div class="login">
    <div class="bg">
    </div>
    <Modal class="login-modal" v-model="loginModal" width="360" :closable="false" :mask-closable="false">
      <div>
        <h2 style="margin:10px;color:#abcdef;text-align:center">
          <img :src="require('../../assets/img/logo.png')" alt="" height="50"></h2>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate">
          <Form-item prop="name">
            <Input v-model="formValidate.name" placeholder="请输入姓名"></Input>
          </Form-item>
          <Form-item prop="password">
            <Input v-model="formValidate.password" @keyup.native.enter="handleSubmit('formValidate')" type="password" placeholder="请输入密码"></Input>
          </Form-item>

          <Row>
            <Col span="12">
            <Checkbox-group v-model="formValidate.remember">
              <Checkbox label="记住我"></Checkbox>
            </Checkbox-group>
            </Col>
          </Row>

        </Form>
      </div>
      <div slot="footer">
        <Button type="primary" size="large" long :loading="modal_loading" @click="handleSubmit('formValidate')">登录
        </Button>
        <small style="text-align: center;display:block" class="subText">明光筑梦</small>
      </div>
    </Modal>
  </div>
</template>
<script>
  import axios from 'axios'
  import Cookies from 'js-cookie'
  export default {
    name: 'login',
    data () {
      return {
        loginModal: true,
        modal_loading: false,
        formValidate: {
          name: '',
          password: ''
        },
        ruleValidate: {
          name: [
            {required: true, message: '姓名不能为空', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '密码错误', trigger: 'blur'}
          ]

        }
      }
    },
    methods: {
      handleSubmit (name) { // login
        this.$refs[name].validate((valid) => {
          this.modal_loading = true
          if (valid) {
            // 构建用于发送给后端的登录数据
            const loginData = {
              username: this.formValidate.name,
              password: this.formValidate.password
            }
            // 向后端发送登录请求
            // eslint-disable-next-line no-undef
            axios.post('http://localhost:8080/children/child/loginChild', null, {
              params: {
                username: this.formValidate.name,
                password: this.formValidate.password
              }
            })
              .then(response => {
                this.modal_loading = false
                if (response.data.code === '666') {
                  this.$Message.success('登录成功!')
                  Cookies.set('token', response.data.token)
                  const childId = response.data.data.id // 假设后端返回的childId
                  const hasChild = response.data.data
                  console.log(response.data.data.id)
                  this.$router.push({ name: 'home', query: { childId } })
                  this.$router.push({ name: 'index', query: { childId } })
                  this.$router.push({name: 'index', query: { hasChild }})
                  this.$router.push({name: 'home', query: {hasChild}})
                  // this.$router.push({name: 'tasks', query: { hasChild }})
                  // this.$router.push({name: 'detail', query: {hasChild}})
                  // this.$router.push({name: 'chart', query: { hasChild }})
                  // this.$router.push({name: 'Course', query: {hasChild}})
                  // this.$router.push({name: 'table', query: { hasChild }})
                  // this.$router.push({name: 'icon', query: {hasChild}})
                  // this.$router.push({name: 'filter', query: { hasChild }})
                  // this.$router.push({name: 'notFound', query: {hasChild}})
                  // this.$router.push({name: 'index', query: {hasChild}})
                } else {
                  this.$Message.error('登录失败!')
                  console.error('登录失败:', response.data)
                  this.$Notice.warning({
                    title: '登录提示123',
                    desc: '用户名/密码错误...'
                  })
                }
              })
              .catch(error => {
                this.modal_loading = false
                console.error('登录请求失败:', error)
                console.error('登录请求失败:', loginData)
              })
          } else {
            this.modal_loading = false
            this.$Message.error('表单验证失败!')
            this.$Notice.warning({
              title: '登录提示',
              desc: '用户名/密码随意输入...'
            })
          }
        })
      }
    }
  }
</script>


