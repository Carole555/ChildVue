<!--<template>-->
<!--&lt;!&ndash;  <el-dialog&ndash;&gt;-->
<!--&lt;!&ndash;    title="物品兑换"&ndash;&gt;-->
<!--&lt;!&ndash;    :visible.sync="dialogFormVisible"&ndash;&gt;-->
<!--&lt;!&ndash;    @close="clear">&ndash;&gt;-->
<!--  <div>-->
<!--    <div v-if="dialogFormVisible" class="popup">-->
<!--      <div class="popup-content">-->

<!--        <div class="popup-content">-->
<!--          <div class="content-container">-->
<!--            <div class="image-container">-->
<!--              <img :src="imageUrl" alt="Image" class="image">-->
<!--            </div>-->
<!--            <div class="text-container">-->
<!--              <h3 class="image-name">{{ imageName }}</h3>-->
<!--              <p class="image-description">{{ imageDescription }}</p>-->
<!--              <p class="image-price">积分: {{ imagePrice }}</p>-->
<!--              <div class="quantity-container">-->
<!--                <button class="quantity-button" @click="decreaseQuantity">-</button>-->
<!--                <span class="quantity">数量: {{ quantity }}</span>-->
<!--                <button class="quantity-button" @click="increaseQuantity">+</button>-->
<!--              </div>-->
<!--              <p class="total-points">消耗积分为: {{ totalPoints }}</p>-->
<!--              <button class="cancel-button" @click="cancel">-->
<!--                <span class="cancel-icon">X</span>-->
<!--                取消-->
<!--              </button>-->
<!--            </div>-->
<!--          </div>-->
<!--          <button class="exchange-button" @click="exchange">立即兑换</button>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->

<!--    &lt;!&ndash; 兑换成功弹窗 &ndash;&gt;-->
<!--    <div v-if="isExchangeSuccessVisible" class="exchange-success-popup">-->
<!--      <div class="popup-content">-->
<!--        <h3 class="success-message">兑换成功</h3>-->
<!--        <button class="close-button" @click="closeExchangeSuccessPopup">关闭</button>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--&lt;!&ndash;  </el-dialog>&ndash;&gt;-->
<!--</template>-->
<!--<script>-->
<!--import {defineComponent} from 'vue'-->

<!--export default defineComponent({-->
<!--  name: 'Exchange',-->
<!--  data () {-->
<!--    return {-->
<!--      dialogFormVisible: false,-->
<!--      isExchangeSuccessVisible: false,-->
<!--      quantity: 1,-->
<!--      // 其他数据字段-->
<!--      imageUrl: '/static/img/fullstack.jpg',-->
<!--      imageName: '图片名称',-->
<!--      imageDescription: '图片描述',-->
<!--      imagePrice: 10-->
<!--     // 假设价格为10-->
<!--    }-->
<!--  },-->
<!--  computed: {-->
<!--    totalPoints () {-->
<!--      // 在这里根据需要计算总积分，并返回计算结果-->
<!--      // 可以使用this关键字访问组件中的其他属性进行计算-->
<!--      return this.quantity * this.imagePrice-->
<!--    }-->
<!--  },-->
<!--  methods: {-->
<!--    clear () { },-->
<!--    decreaseQuantity () {-->
<!--      if (this.quantity > 1) {-->
<!--        this.quantity&#45;&#45;-->
<!--      }-->
<!--    },-->
<!--    increaseQuantity () {-->
<!--      // 可根据需要添加数量限制-->
<!--      this.quantity++-->
<!--    },-->
<!--    exchange () {-->
<!--      // 执行兑换操作，可以在这里添加相关逻辑-->
<!--      // 兑换成功后显示兑换成功弹窗，并关闭当前弹窗-->
<!--      this.isExchangeSuccessVisible = true-->
<!--      this.dialogFormVisible = false-->
<!--    },-->
<!--    closeExchangeSuccessPopup () {-->
<!--      this.isExchangeSuccessVisible = false-->
<!--    },-->
<!--    cancel () {-->
<!--      // 取消的事件处理逻辑-->
<!--      // 可以在这里执行关闭弹窗的操作-->
<!--      this.dialogFormVisible = false-->
<!--    }-->
<!--    // 其他方法-->
<!--  }-->
<!--})-->
<!--</script>-->

<!--<style>-->
<!--.popup {-->
<!--  position: fixed;-->
<!--  top: 0;-->
<!--  left: 0;-->
<!--  width: 100%;-->
<!--  height: 100%;-->
<!--  background-color: rgba(0, 0, 0, 0.5);-->
<!--  display: flex;-->
<!--  align-items: center;-->
<!--  justify-content: center;-->
<!--}-->

<!--/*.popup-content {*/-->
<!--/*  background-color: #fff;*/-->
<!--/*  padding: 20px;*/-->
<!--/*  max-width: 700px; !* 调整弹窗的最大宽度 *!*/-->
<!--/*  width: 100%; !* 添加宽度属性 *!*/-->
<!--/*  border-radius: 4px;*/-->
<!--/*  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);*/-->
<!--/*  position: relative;*/-->
<!--/*}*/-->

<!--.content-container {-->
<!--  display: flex;-->
<!--  align-items: flex-start; /* 使内容顶部对齐 */-->
<!--}-->

<!--.image-container {-->
<!--  margin-right: 20px;-->
<!--}-->

<!--.image {-->
<!--  width: 100px;-->
<!--  height: 100px;-->
<!--  object-fit: cover;-->
<!--  border-radius: 4px;-->
<!--}-->

<!--.text-container {-->
<!--  flex-grow: 1; /* 让文本容器占据剩余空间 */-->
<!--}-->

<!--.popup img {-->
<!--  width: 150px;-->
<!--  height: 150px;-->
<!--  object-fit: cover;-->
<!--  margin-bottom: 10px;-->
<!--}-->

<!--.popup button {-->
<!--  margin-top: 10px;-->
<!--}-->

<!--.exchange-success-popup {-->
<!--  position: fixed;-->
<!--  top: 0;-->
<!--  left: 0;-->
<!--  width: 100%;-->
<!--  height: 100%;-->
<!--  background-color: rgba(0, 0, 0, 0.5);-->
<!--  display: flex;-->
<!--  align-items: center;-->
<!--  justify-content: center;-->
<!--}-->

<!--.exchange-success-popup .popup-content {-->
<!--  background-color: white;-->
<!--  padding: 20px;-->
<!--  text-align: center;-->
<!--}-->
<!--.cancel-button {-->
<!--  position: absolute;-->
<!--  left: 10px;-->
<!--  top: 250px;-->
<!--  padding: 10px 20px;-->
<!--  background-color: #ff0000;-->
<!--  color: #ffffff;-->
<!--  border: none;-->
<!--  border-radius: 4px;-->
<!--  cursor: pointer;-->
<!--}-->

<!--.cancel-icon {-->
<!--  margin-right: 4px;-->
<!--  font-weight: bold;-->
<!--}-->
<!--</style>-->
<!--<style>-->
<!--.exchange-button {-->
<!--  position: absolute;-->
<!--  left: 260px;-->
<!--  top: 250px;-->
<!--  padding: 10px 20px;-->
<!--  background-color: #007bff;-->
<!--  color: #fff;-->
<!--  border: none;-->
<!--  border-radius: 4px;-->
<!--  cursor: pointer;-->
<!--}-->


<!--.popup-content {-->
<!--  position: relative;-->
<!--  background-color: #fff;-->
<!--  padding: 20px;-->
<!--  max-width: 700px;-->
<!--  text-align: center;-->
<!--  border-radius: 4px;-->
<!--  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);-->
<!--}-->

<!--.image-container {-->
<!--  margin-bottom: 10px;-->
<!--}-->

<!--.image {-->
<!--  width: 100px;-->
<!--  height: 100px;-->
<!--  object-fit: cover;-->
<!--  border-radius: 4px;-->
<!--}-->

<!--.image-name {-->
<!--  font-size: 18px;-->
<!--  font-weight: bold;-->
<!--  margin-bottom: 10px;-->
<!--}-->

<!--.image-description {-->
<!--  margin-bottom: 10px;-->
<!--  color: #666;-->
<!--}-->

<!--.image-price {-->
<!--  margin-bottom: 10px;-->
<!--}-->

<!--.quantity-container {-->
<!--  display: flex;-->
<!--  align-items: center;-->
<!--  justify-content: center;-->
<!--  margin-bottom: 10px;-->
<!--}-->

<!--.quantity-button {-->
<!--  padding: 5px 10px;-->
<!--  background-color: #007bff;-->
<!--  color: #fff;-->
<!--  border: none;-->
<!--  border-radius: 4px;-->
<!--  cursor: pointer;-->
<!--}-->

<!--.quantity {-->
<!--  margin: 0 10px;-->
<!--  font-size: 16px;-->
<!--}-->

<!--.total-points {-->
<!--  margin-bottom: 10px;-->
<!--  color: #666;-->
<!--}-->

<!--.exchange-success-popup {-->
<!--  position: fixed;-->
<!--  top: 0;-->
<!--  left: 0;-->
<!--  width: 100%;-->
<!--  height: 100%;-->
<!--  background-color: rgba(0, 0, 0, 0.5);-->
<!--  display: flex;-->
<!--  align-items: center;-->
<!--  justify-content: center;-->
<!--}-->

<!--.success-message {-->
<!--  font-size: 24px;-->
<!--  font-weight: bold;-->
<!--  margin-bottom: 10px;-->
<!--}-->

<!--.close-button {-->
<!--  padding: 10px 20px;-->
<!--  background-color: #007bff;-->
<!--  color: #fff;-->
<!--  border: none;-->
<!--  border-radius: 4px;-->
<!--  cursor: pointer;-->
<!--}-->

<!--</style>-->

<template>
  <div>
    <div v-if="dialogFormVisible" class="popup">
      <div class="popup-content">
        <div class="content-container">
        <div class="image-container">
          <img :src="imageUrl" alt="Image" class="image">
        </div>
        <div class="text-container">
          <h3 class="image-name">{{ imageName }}</h3>
          <p class="image-description">{{ imageDescription }}</p>
          <p class="image-price">积分: {{ imagePrice }}</p>
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
  </div>
</template>
<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'Exchange',
  data () {
    return {
      dialogFormVisible: false,
      isExchangeSuccessVisible: false,
      quantity: 1,
      // 其他数据字段
      imageUrl: '/static/img/fullstack.jpg',
      imageName: '图片名称',
      imageDescription: '图片描述',
      imagePrice: 10
     // 假设价格为10
    }
  },
  computed: {
    totalPoints () {
      // 在这里根据需要计算总积分，并返回计算结果
      // 可以使用this关键字访问组件中的其他属性进行计算
      return this.quantity * this.imagePrice
    }
  },
  methods: {
    clear () { },
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
      this.isExchangeSuccessVisible = true
      this.dialogFormVisible = false
    },
    closeExchangeSuccessPopup () {
      this.isExchangeSuccessVisible = false
    },
    cancel () {
      // 取消的事件处理逻辑
      // 可以在这里执行关闭弹窗的操作
      this.dialogFormVisible = false
    }
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
  width: 200px;
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


