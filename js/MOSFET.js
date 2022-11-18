import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module';
import { OrbitControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls';
import * as dat from 'https://cdn.skypack.dev/dat.gui';

//전자의 갯수
const TOTAL_ELECT_NUM = 10

//gui 설정
var gui = new dat.GUI();
const guiVar = {
  MOSFET: {
    gateSourceVoltage: 0,
    drainSourceVoltage: 0
  }
}

//다이오드 클래스
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
    this.zeroHoleRadius = 0.8

    //전자의 이동 거리
    this.zeroHoleMoveDist
    //전압에 따라서 전자의 이동거리 설정
    this.resetSpeed()
  }

  //모델을 나타내기 위한 초기 설정
  initModel(scene) {
    let heightArr = [3 / 8, 2 / 8, 3 / 8]
    let xPos = [-5 / 16, 0, 5 / 16]
    let colorArr = [0x00FFFF, 0x666666, 0xFF00FF]
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
      this.zeroMeshArr.push(new THREE.Mesh(new THREE.SphereGeometry(this.zeroHoleRadius, 32, 16), new THREE.MeshBasicMaterial({color: 0xFF0000})))
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

//MOSFET 클래스
class Mosfet  {
  //실행시 변수 설정
  constructor(inputGateVoltage, inputDrainVoltage, inputSourceVoltage, inputBodyVoltage) {
    //MOSFET의 V_TH
    this.thresholdVoltage = 0.7

    //MOSFET의 kp
    this.transconductance = 0.0001

    //MOSFET의 길이 비율
    this.widthLengthRatio = 10

    //MOSFET의 lambda 값
    this.lambda = 0.01

    //MOSFET의 Gate의 입력 전압
    this.gateVoltage = inputGateVoltage

    //MOSFET의 Drain의 입력 전압
    this.drainVoltage = inputDrainVoltage

    //MOSFET의 Source의 입력 전압
    this.sourceVoltage = inputSourceVoltage

    //MOSFET의 Body의 입력 전압
    this.bodyVoltage = inputBodyVoltage

    //MOSFET 모델을 도형으로 저장. 총 4개의 원소 저장
    this.modelMeshArr = []

    //MOSFET 모델을 선으로 저장. 총 4개의 원소 저장
    this.lineMeshArr = []

    //전자 모델을 도형으로 저장
    this.electronMeshArr = []

    //전자 모델의 도착지를 좌표로 저장
    this.electronDestArr = []

    //전자 모델의 반지름 저장
    this.electronRadius = 0.8

    //전자 모델의 이동거리 조절
    this.electronMoveDist = 0.01
  }

  //모델을 나타내기 위한 초기 설정
  initModel(xPos, yPos, scene) {
    let colorArr = [0x00FFFF, 0x00FFFF, 0xFF00FF, 0x666666]
    this.lineMeshArr.push(this.makeModelOne(10 + xPos, 5 + yPos))
    this.lineMeshArr.push(this.makeModelOne(40 + xPos, 5 + yPos))
    this.lineMeshArr.push(this.makeModelTwo(xPos, yPos))
    this.lineMeshArr.push(this.makeModelThree(27.5 + xPos, 10 + yPos))

    //extrude settings
    const extrudeSettings = { depth: 8, bevelEnabled: false};

    for(let i = 0; i < colorArr.length; i++)  {
      this.modelMeshArr.push(new THREE.Mesh(new THREE.ExtrudeGeometry(this.lineMeshArr[i], extrudeSettings), new THREE.MeshBasicMaterial({color: colorArr[i]})))
      this.modelMeshArr[i].material.transparent = true
      this.modelMeshArr[i].material.opacity = 0.5
    }

    //add mesh to scene
    for(let i = 0; i < this.modelMeshArr.length; i++)  {
      scene.add(this.modelMeshArr[i])
    }
  }

  //모델 초기 설정을 위한 함수(Drain, Source을 구현)
  makeModelOne(xPos, yPos) {
    const tempLines = new THREE.Shape()
      .moveTo(xPos, yPos + 5)
      .lineTo(xPos + 20, yPos + 5)
      .quadraticCurveTo(xPos + 20, yPos, xPos + 15, yPos)
      .lineTo(xPos + 5, yPos)
      .quadraticCurveTo(xPos, yPos, xPos, yPos + 5)
  
    return tempLines
  }
  
  //모델 초기 설정을 위한 함수(Body 구현)
  makeModelTwo(xPos, yPos) {
    const tempLines = new THREE.Shape()
      .moveTo(xPos, yPos)
      .lineTo(xPos, yPos + 10)
      .lineTo(xPos + 10, yPos + 10)
      .quadraticCurveTo(xPos + 10, yPos + 5, xPos + 15, yPos + 5)
      .lineTo(xPos + 25, yPos + 5)
      .quadraticCurveTo(xPos + 30, yPos + 5, xPos + 30, yPos + 10)
      .lineTo(xPos + 40, yPos + 10)
      .quadraticCurveTo(xPos + 40, yPos + 5, xPos + 45, yPos + 5)
      .lineTo(xPos + 55, yPos + 5)
      .quadraticCurveTo(xPos + 60, yPos + 5, xPos + 60, yPos + 10)
      .lineTo(xPos + 70, yPos + 10)
      .lineTo(xPos + 70, yPos)
      .lineTo(xPos, yPos)
    return tempLines
  }
  
  //모델 초기 설정을 위한 함수(Gate 구현)
  makeModelThree(xPos, yPos) {
    const tempLines = new THREE.Shape()
      .moveTo(xPos, yPos)
      .lineTo(xPos + 15, yPos)
      .lineTo(xPos + 15, yPos + 2)
      .lineTo(xPos, yPos + 2)
      .lineTo(xPos, yPos)
    return tempLines
  }

  //MOSFET의 동작영역 출력
  //0: Cutoff 1: Linear 2: Saturation
  checkRegion() {
    if(this.thresholdVoltage > this.gateVoltage - this.sourceVoltage)  {
      return 0
    }
    if(this.drainVoltage > this.gateVoltage - this.thresholdVoltage)  {
      return 2
    }
    return 1
  }

  //MOSFEET의 Drain / Source에서의 전류 구현
  checkDrainCurrent() {
    let region = this.checkRegion()
    let drainSourceVoltage = this.drainVoltage - this.sourceVoltage
    if(region == 0) {
      return 0
    } else if(region == 1)  {
      return this.transconductance * this.widthLengthRatio * ((this.gateVoltage - this.sourceVoltage - this.thresholdVoltage) * drainSourceVoltage - drainSourceVoltage * drainSourceVoltage / 2) * (1 + this.lambda * drainSourceVoltage)
    }
    return this.transconductance * this.widthLengthRatio / 2 * (this.gateVoltage - this.sourceVoltage - this.thresholdVoltage) * (this.gateVoltage - this.sourceVoltage - this.thresholdVoltage) * (1 + this.lambda * drainSourceVoltage)
  }

  //애니메이션을 위한 초기 설정
  initAnimation() {
    for(let i = 0; i < TOTAL_ELECT_NUM; i++)  {
      this.electronMeshArr.push(new THREE.Mesh(new THREE.SphereGeometry(this.electronRadius, 32, 16), new THREE.MeshBasicMaterial({color: 0xFFFF00})))
      this.electronDestArr.push([])
      for(let j = 0; j < 3; j++)  {
        this.electronDestArr[i].push(0)
      }
      this.electResetPos(i)
      scene.add(this.electronMeshArr[i])
    }
  }

  //반복되는 애니메이션 구현(전자의 이동)
  loopAnimation() {
    this.electronMoveDist = this.checkDrainCurrent() * 1.5
    if(this.electronMoveDist <= 0)  {
      return
    }
    for(let i = 0; i < TOTAL_ELECT_NUM; i++) {
      let dist = Math.pow(this.electronMeshArr[i].position.x - this.electronDestArr[i][0], 2) + Math.pow(this.electronMeshArr[i].position.y - this.electronDestArr[i][1], 2) + Math.pow(this.electronMeshArr[i].position.z - this.electronDestArr[i][2], 2)
      if(dist < this.electronMoveDist)  {
        this.electResetPos(i)
      } else {
        let moveMult = Math.sqrt(this.electronMoveDist / dist)
        this.electronMeshArr[i].position.x += (this.electronDestArr[i][0] - this.electronMeshArr[i].position.x) * moveMult
        this.electronMeshArr[i].position.y += (this.electronDestArr[i][1] - this.electronMeshArr[i].position.y) * moveMult
        this.electronMeshArr[i].position.z += (this.electronDestArr[i][2] - this.electronMeshArr[i].position.z) * moveMult
      }
    }
  }

  //indexNum에 있는 전자와 도착 지점의 위치 리셋
  electResetPos(indexNum)  {
    this.electronMeshArr[indexNum].position.x = Math.random() * (10 - 2 * this.electronRadius) + this.electronRadius + 15
    this.electronMeshArr[indexNum].position.y = Math.random() * (5 - 2 * this.electronRadius) + this.electronRadius + 5
    this.electronMeshArr[indexNum].position.z = Math.random() * (7 - 2 * this.electronRadius) + this.electronRadius
    this.electronDestArr[indexNum][0] = Math.random() * (10 - 2 * this.electronRadius) + this.electronRadius + 45
    this.electronDestArr[indexNum][1] = Math.random() * (5 - 2 * this.electronRadius) + this.electronRadius + 5
    this.electronDestArr[indexNum][2] = Math.random() * (7 - 2 * this.electronRadius) + this.electronRadius
  }
}

//캔버스 설정
var myCanvas = document.querySelector('canvas.three_content')

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
const newMOS = new Mosfet(3, 1, 0, 0)
//모델 초기 설정
newMOS.initModel(0, 0, scene)
newMOS.initAnimation()

//마우스를 사용한 카메라의 이동, 줌 설정
new OrbitControls(camera, renderer.domElement)

//애니메이션 함수
function animate()	{
  //애니메이션 반복 코드
	requestAnimationFrame(animate)

  //렌더 업데이트
	renderer.render(scene, camera)

  newMOS.loopAnimation()
}

gui.add(guiVar.MOSFET, 'gateSourceVoltage', -1, 1).onChange(() => {
  newMOS.gateVoltage = guiVar.MOSFET.gateSourceVoltage
  for(let i = 0; i < TOTAL_ELECT_NUM; i++) {
    newMOS.electResetPos(i)
  }
})
gui.add(guiVar.MOSFET, 'drainSourceVoltage', -1, 1).onChange(() => {
  newMOS.drainVoltage = guiVar.MOSFET.drainSourceVoltage
  for(let i = 0; i < TOTAL_ELECT_NUM; i++) {
    newMOS.electResetPos(i)
  }
  console.log(newMOS.electronDestArr)
})

//애니메이션 시작(필수)
animate()
