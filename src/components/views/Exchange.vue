<template>
  <div>
    <div v-if="dialogFormVisible" class="popup">
      <div class="popup-content">
        <div class="content-container">
        <div class="image-container">
          <img :src="form.subPhoto" alt="Image" class="image">
        </div>
        <div class="text-container">
          <h3 class="image-name">{{ form.name }}</h3>
          <p class="image-description">{{ form.content }}</p>
          <p class="image-price">积分: {{ form.value }}</p>
          <div class="quantity-container">
            <button class="quantity-button" @click="decreaseQuantity">-</button>
            <span class="quantity">数量: {{ quantity }}</span>
            <button class="quantity-button" @click="increaseQuantity">+</button>
          </div>
          <p class="total-points">消耗积分: {{ totalPoints }}</p>
          <div class="button-container">
            <button class="cancel-button" @click="cancel">
              <span class="cancel-icon">X</span>
              取消
            </button>
            <button class="exchange-button" @click="exchange">立即兑换</button>
          </div>
        </div>
      </div>
      </div>
    </div>

    <div v-if="isExchangeSuccessVisible" class="exchange-success-popup">
      <div class="popup-content">
        <h3 class="success-message">兑换成功</h3>
        <button class="close-button" @click="closeExchangeSuccessPopup">关闭</button>
      </div>
    </div>
    <div v-if="isExchangeFailVisible" class="exchange-success-popup">
      <div class="popup-content">
        <h3 class="success-message">兑换失败</h3>
        <h3 class="success-message">请确认当前积分是否足够！</h3>
        <button class="close-button" @click="closeExchangeFailPopup">关闭</button>
      </div>
    </div>
  </div>
</template>
<script>
import {defineComponent} from 'vue'
import {getUser} from '../../common/utils'

export default defineComponent({
  name: 'Exchange',
  data () {
    return {
      dialogFormVisible: false,
      isExchangeSuccessVisible: false,
      isExchangeFailVisible: false,
      quantity: 1,
      // 其他数据字段
      form: {
        id: '',
        name: '',
        subPhoto: '',
        value: '',
        content: ''
      }
    }
  },
  computed: {
    totalPoints () {
      // 在这里根据需要计算总积分，并返回计算结果
      // 可以使用this关键字访问组件中的其他属性进行计算
      return this.quantity * this.form.value
    }
  },
  // mounted: function () {
  //   const childId = this.$route.query.childId
  //   console.log('Child ID:', childId)
  //   const hasChild = this.$route.query.hasChild
  //   console.log('haschildzsh', hasChild)
  // },
  methods: {
    clear () {
      this.form = {
        id: '',
        name: '',
        subPhoto: '',
        value: '',
        content: ''
      }
    },
    decreaseQuantity () {
      if (this.quantity > 1) {
        this.quantity--
      }
    },
    increaseQuantity () {
      // 可根据需要添加数量限制
      this.quantity++
    },
    exchange () {
      // 执行兑换操作，可以在这里添加相关逻辑
      // 兑换成功后显示兑换成功弹窗，并关闭当前弹窗
      // const hasChild = this.$route.query.hasChild
      // console.log('haschildzsh', hasChild)
      if (getUser().score >= this.totalPoints) {
        this.$axios
          .post('http://localhost:8080/children/purchase/add', {
            subId: this.form.id,
            subNum: this.quantity,
            childId: getUser().id,
            value: this.form.value
          }).then(response => {
            if (response.data.success) {
              this.isExchangeSuccessVisible = true
              this.dialogFormVisible = false
            }
          })
      } else {
        this.isExchangeFailVisible = true
        this.dialogFormVisible = false
      }
    },
    closeExchangeSuccessPopup () {
      this.isExchangeSuccessVisible = false
    },
    closeExchangeFailPopup () {
      this.isExchangeFailVisible = false
    },
    cancel () {
      // 取消的事件处理逻辑
      // 可以在这里执行关闭弹窗的操作
      this.dialogFormVisible = false
    }
    // getImgUrl (subPhoto) {
    //   return `../static/img/${subPhoto}`
    // }
    // 其他方法
  }
})
</script>
<style>
.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.content-container {
  display: flex;
  align-items: flex-start; /* 使内容顶部对齐 */
}
.popup-content {
  position: relative;
  background-color: #fff;
  padding: 20px;
  max-width: 700px;
  text-align: center;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.image-container {
  margin-bottom: 20px;
}

.image {
  width: 160px;
  height: 160px;
  border-radius: 4px;
}

.text-container {
  margin-bottom: 20px;
}

.image-name {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.image-description {
  margin-bottom: 10px;
  color: #666;
}

.image-price {
  margin-bottom: 10px;
}

.quantity-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
}

.quantity-button {
  padding: 4px 5px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.quantity {
  margin: 0 10px;
  font-size: 18px;
}

.total-points {
  margin-bottom: 10px;
  color: #666;
}

.button-container {
  display: flex;
  justify-content: center;
}


.exchange-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.cancel-button {
  padding: 10px 20px;
  background-color: #ff0000;
 color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.cancel-button {
  margin-right: 10px;
}

.cancel-icon {
  margin-right: 4px;
  font-weight: bold;
}

.exchange-success-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.success-message {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 10px;
}

.close-button {
  padding: 8px 8px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>


