<template>
  <div>
    <section
      class="files-container"
      :class="{ 'full-screen': isFullScreen }"
    >
      <div class="file-container">
        <pdf
          src="https://github.com/1014156094/vue-audio-player/blob/master/public/1.pdf?raw=true"
          :page="currentPage"
          @num-pages="pageCount = $event"
          @page-loaded="currentPage = $event"
          @loaded="loadPdfHandler"
          ref="pdf"
          class="file"
          :style="{ width: 100 * fileScale + '%' }"
        />
      </div>
      <div class="control-contiainer">
        <span @click="isFullScreen = !isFullScreen">
          {{ isFullScreen ? '窗口' : '全屏' }}
        </span>
        <span
          @click="scalePlus"
          class="btn iconfont icon-zoom-in"
          :class="{ hightlight: fileScale === 3 }"
        />
        <span
          @click="scaleMinus"
          class="btn iconfont icon-zoom-out"
          :class="{ hightlight: fileScale === 1 }"
        />
        <span class="scale-num">
          X{{ fileScale }}
        </span>
        <span
          @click="changePdfPage(0)"
          class="btn"
          :class="{ higDhtlight: currentPage===1 }"
        >
          上一页
        </span>
        {{ currentPage }} / {{ pageCount }}
        <span
          @click="changePdfPage(1)"
          class="btn"
          :class="{ hightlight: currentPage===pageCount }"
        >
          下一页
        </span>
      </div>
    </section>
  </div>
</template>

<script>
import pdf from 'vue-pdf'

export default {
  components: {
    pdf
  },
  data () {
    return {
      showDialog: false
    }
  },
  methods: {
    // 放大
    scalePlus () {
      if (this.fileScale >= 3) {
        return
      }
      this.fileScale += 0.5
      this.$nextTick(() => {
        setTimeout(() => {
          this.$refs.pdf.$refs.annotationLayer.style.width = this.$refs.pdf.$refs.canvas.offsetWidth
          this.$refs.pdf.$refs.annotationLayer.style.height = this.$refs.pdf.$refs.canvas.offsetHeight
        }, 1000)
      })
    },
    // 缩小
    scaleMinus () {
      if (this.fileScale <= 1) {
        return
      }
      this.fileScale -= 0.5
      this.$nextTick(() => {
        setTimeout(() => {
          this.$refs.pdf.$refs.annotationLayer.style.width = this.$refs.pdf.$refs.canvas.offsetWidth
          this.$refs.pdf.$refs.annotationLayer.style.height = this.$refs.pdf.$refs.canvas.offsetHeight
        }, 1000)
      })
    },
    // pdf加载后
    loadPdfHandler (e) {
      this.currentPage = 1 // 加载的时候先加载第一页
    },
    // 改变PDF页码，val传过来区分上一页下一页的值，0上一页，1下一页
    changePdfPage (val) {
      if (val === 0 && this.currentPage > 1) {
        this.currentPage--
      }
      if (val === 1 && this.currentPage < this.pageCount) {
        this.currentPage++
      }
    }
  }
}
</script>

<style lang="less" scoped>
section.files-container {
  background: #fff;
  &.full-screen {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 9999;
  }
  .file-container {
    height: 100%;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
    .file {
      height: 280px;
    }
  }
  .control-contiainer {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.7);
    text-align: center;
    padding: 5px 0;
    font-size: 12px;
    color: rgba(255, 255, 255, 1);
    background: rgba(68, 154, 235, 0.7);
    > span {
      margin: 0 8px;
    }
    .scale-num {
      min-width: 26px;
    }
    .btn {
      &.hightlight {
        color: rgba(255, 255, 255, 0.3);
      }
    }
  }
}
</style>
