import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js';
import * as dat from 'https://cdn.skypack.dev/dat.gui';

//Diode의 전압 설정
let voltageDiode = 0.7
//전자의 갯수
const TOTAL_ELECT_NUM = 100

//gui 설정
var gui = new dat.GUI({autoPlace: false});
const guiVar = {
  Diode:  {
    Voltage: 0.7
  }
}

//전압의 변화 설정
gui.add(guiVar.Diode, 'Voltage', -0.7, 1.7).onChange(() => {
  voltageDiode = guiVar.Diode.Voltage
  for(let i = 0; i < TOTAL_ELECT_NUM; i++) {
    newDiode.resetZeroHole(i)
  }
  newDiode.resetSpeed()
})

class Diode {
  //실행시 변수 설정
  constructor(inputVoltage) {
    //다이오드의 전압
    this.voltage = inputVoltage

    //다이오드 모델의 정사각형 한 변의 길이
    this.sideLen = 10

    //다이오드의 길이
    this.height = 50

    //다이오드 모델의 도형을 저장. 총 3개의 원소 저장
    this.modelMeshArr = []

    //다이오드 모델의 선을 저장. 총 3개의 원소 저장
    this.lineMeshArr = []

    //모델의 구멍 저장. 총 전자의 갯수 만큼 원소 저장
    this.holeMeshArr = []

    //전자 모델 저장. 총 전자의 갯수 만큼 원소 저장
    this.zeroMeshArr = []

    //전자와 구멍 모델의 반지름 설정
    this.zeroHoleRadius = 0.5

    //전자의 이동 거리
    this.zeroHoleMoveDist
    //전압에 따라서 전자의 이동거리 설정
    this.resetSpeed()
  }

  //모델을 나타내기 위한 초기 설정
  initModel(scene) {
    let heightArr = [3 / 8, 2 / 8, 3 / 8]
    let xPos = [-5 / 16, 0, 5 / 16]
    let colorArr = [0x0068B7, 0x666666, 0xEA68A2]
    this.modelMeshArr = []
    this.lineMeshArr = []
    for(let i = 0; i < 3; i++)  {
      this.modelMeshArr.push(new THREE.Mesh(new THREE.BoxGeometry(heightArr[i] * this.height, this.sideLen, this.sideLen), new THREE.MeshBasicMaterial({color: colorArr[i]})))
      this.lineMeshArr.push(new THREE.LineSegments(new THREE.EdgesGeometry(this.modelMeshArr[i].geometry), new THREE.LineBasicMaterial({color: 0xFFFF00})))
      this.modelMeshArr[i].position.x = xPos[i] * this.height
      this.lineMeshArr[i].position.x = xPos[i] * this.height
      this.modelMeshArr[i].material.transparent = true
      this.modelMeshArr[i].material.opacity = 0.5
      scene.add(this.modelMeshArr[i])
      scene.add(this.lineMeshArr[i])
    }
  }

  //애니메이션을 위한 초기 설정
  initAnimation() {
    this.holeMeshArr = []
    this.zeroMeshArr = []
    for(let i = 0; i < TOTAL_ELECT_NUM; i++)  {
      this.zeroMeshArr.push(new THREE.Mesh(new THREE.SphereGeometry(this.zeroHoleRadius, 32, 16), new THREE.MeshBasicMaterial({color: 0xFFFF00})))
      this.holeMeshArr.push(new THREE.Mesh(new THREE.SphereGeometry(this.zeroHoleRadius, 32, 16), new THREE.MeshBasicMaterial({color: 0xFFFFFF})))
      this.resetZeroHole(i)
      scene.add(this.zeroMeshArr[i])
      scene.add(this.holeMeshArr[i])
    }
  }

  //반복되는 애니메이션 구현(홀으로 향하는 전자의 이동)
  loopAnimation() {
    for(let i = 0; i < TOTAL_ELECT_NUM; i++) {
      let dist = Math.pow(this.zeroMeshArr[i].position.x - this.holeMeshArr[i].position.x, 2) + Math.pow(this.zeroMeshArr[i].position.y - this.holeMeshArr[i].position.y, 2) + Math.pow(this.zeroMeshArr[i].position.z - this.holeMeshArr[i].position.z, 2)
      if(dist < this.zeroHoleMoveDist)  {
        this.resetZeroHole(i)
      } else {
        let moveMult = Math.sqrt(this.zeroHoleMoveDist / dist)
        this.zeroMeshArr[i].position.x += (this.holeMeshArr[i].position.x - this.zeroMeshArr[i].position.x) * moveMult
        this.zeroMeshArr[i].position.y += (this.holeMeshArr[i].position.y - this.zeroMeshArr[i].position.y) * moveMult
        this.zeroMeshArr[i].position.z += (this.holeMeshArr[i].position.z - this.zeroMeshArr[i].position.z) * moveMult
      }
    }
  }

  //indexNum에 있는 전자와 홀 리셋
  resetZeroHole(indexNum) {
    let middleLength = this.getMiddleLength()
    this.zeroMeshArr[indexNum].position.x = Math.random() * (this.height - middleLength - 4 * this.zeroHoleRadius) / 2 + this.zeroHoleRadius + middleLength / 2
    this.holeMeshArr[indexNum].position.x = Math.random() * (this.height - middleLength - 4 * this.zeroHoleRadius) / 2 + this.zeroHoleRadius - this.height / 2
    this.holeMeshArr[indexNum].position.y = (Math.random() - 0.5) * (this.sideLen - 2 * this.zeroHoleRadius)
    this.holeMeshArr[indexNum].position.z = (Math.random() - 0.5) * (this.sideLen - 2 * this.zeroHoleRadius)
    this.zeroMeshArr[indexNum].position.y = (Math.random() - 0.5) * (this.sideLen - 2 * this.zeroHoleRadius)
    this.zeroMeshArr[indexNum].position.z = (Math.random() - 0.5) * (this.sideLen - 2 * this.zeroHoleRadius)
  }

  //전압에 따라서 depletion 지역의 길이 설정
  getMiddleLength() {
    this.voltage = voltageDiode
    if(this.voltage >= 0.7) {
      return -8 * Math.sqrt(this.voltage - 0.7) + 10
    } else {
      return 8 * Math.sqrt(0.7 - this.voltage) + 10
    }
  }

  //각각의 지역의 도형과 선을 전압에 따라서 조정
  resetLength()  {
    let middleLength = this.getMiddleLength()
    this.modelMeshArr[0].geometry = new THREE.BoxGeometry((this.height - middleLength) / 2, this.sideLen, this.sideLen)
    this.modelMeshArr[1].geometry = new THREE.BoxGeometry(middleLength, this.sideLen, this.sideLen)
    this.modelMeshArr[2].geometry = new THREE.BoxGeometry((this.height - middleLength) / 2, this.sideLen, this.sideLen)
    this.modelMeshArr[0].position.x = -this.height / 4 - middleLength / 4
    this.modelMeshArr[2].position.x = -this.modelMeshArr[0].position.x
    for(let i = 0; i < 3; i++)  {
      this.lineMeshArr[i].geometry = new THREE.EdgesGeometry(this.modelMeshArr[i].geometry)
    }
    this.lineMeshArr[0].position.x = -this.height / 4 - middleLength / 4
    this.lineMeshArr[2].position.x = -this.lineMeshArr[0].position.x
  }

  //전압에 따라서 전자의 이동 속도 조절
  resetSpeed()  {
    if(this.voltage >= 0.7) {
      this.zeroHoleMoveDist = Math.pow(4, (this.voltage - 0.7)) / 100 + 0.01
    } else {
      this.zeroHoleMoveDist = 0
    }
  }
}

//캔버스 설정
var myCanvas = document.querySelector('#canvas1')
var guiDiv = document.querySelector('#gui')
guiDiv.append(gui.domElement)

//렌더 선언
const renderer = new THREE.WebGLRenderer({
    canvas: myCanvas,
    antialias: true
})

//렌더 사이즈 설정
var widthHeightRatio = myCanvas.getBoundingClientRect()
renderer.setSize(widthHeightRatio.width, widthHeightRatio.height)
renderer.setPixelRatio(devicePixelRatio)

//카메라 선언 및 설정
const camera = new THREE.PerspectiveCamera(
  //시야 각도
  75,

  //화면 비율
  widthHeightRatio.width / widthHeightRatio.height,

  //볼 수 있는 가장 가까운 범위
  0.1,

  //볼 수 있는 가장 먼 범위
  1000
)

//카메라 위치 조정
camera.position.z = 30

//무대 선언
const scene = new THREE.Scene();

var myCanvas = document.querySelector('#canvas1')

//다이오드 객체 정의
const newDiode = new Diode(0.7)
//모델 초기 설정
newDiode.initModel(scene)
//애니매이션 초기 설정
newDiode.initAnimation()

//마우스를 사용한 카메라의 이동, 줌 설정
new OrbitControls(camera, renderer.domElement)

//애니메이션 함수
function animate()	{
  //애니메이션 반복 코드
	requestAnimationFrame(animate)

  //렌더 업데이트
	renderer.render(scene, camera)

  //애니메이션 입력
  //전자의 이동 구현
  newDiode.loopAnimation()
  //전압의 이동에 따라서 모델과 전자, 홀 설정
  newDiode.resetLength()
}

//애니메이션 시작(필수)
animate()
