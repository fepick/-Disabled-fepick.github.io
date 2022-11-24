import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module';
import { OrbitControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls';
import * as dat from 'https://cdn.skypack.dev/dat.gui';

//전자의 갯수
const TOTAL_ELECT_NUM = 50

//gui 설정
var gui = new dat.GUI({autoPlace: false});
const guiVar = {
  MOSFET: {
    gateSourceVoltage: 3,
    drainSourceVoltage: 1
  }
}

//MOSFET 클래스
class Mosfet  {
  //실행시 변수 설정
  constructor(inputGateVoltage, inputDrainVoltage, inputSourceVoltage, inputBodyVoltage) {
    
    this.modelPos

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
  initModel(xPos, yPos, zPos, scene) {
    this.makeModelOne(xPos, yPos, zPos)
    this.makeModelTwo(xPos, yPos, zPos)
    this.makeModelThree(xPos, yPos, zPos)

    this.modelPos = [xPos, yPos, zPos]

    for(let i = 0; i < 4; i++)  {
      this.modelMeshArr[i].material.transparent = true
      this.modelMeshArr[i].material.opacity = 0.5
      scene.add(this.modelMeshArr[i])
      scene.add(this.lineMeshArr[i])
    }
  }

  //모델 초기 설정을 위한 함수(Drain, Source을 구현)
  makeModelOne(xPos, yPos, zPos) {
    let tempMeshOne = new THREE.Mesh(new THREE.BoxGeometry(20, 5, 5), new THREE.MeshBasicMaterial( {color: 0x0068B7} ))
    let tempMeshTwo = new THREE.Mesh(new THREE.BoxGeometry(20, 5, 5), new THREE.MeshBasicMaterial( {color: 0x0068B7} ))

    tempMeshOne.position.x += xPos + 20
    tempMeshOne.position.y += yPos + 7.5
    tempMeshOne.position.z += zPos + 2.5

    tempMeshTwo.position.x += xPos + 50
    tempMeshTwo.position.y += yPos + 7.5
    tempMeshTwo.position.z += zPos + 2.5

    this.modelMeshArr.push(tempMeshOne)
    this.modelMeshArr.push(tempMeshTwo)

    let tempMeshThree = new THREE.LineSegments(new THREE.EdgesGeometry(tempMeshOne.geometry), new THREE.LineBasicMaterial({color: 0xFFFF00}))
    let tempMeshFour = new THREE.LineSegments(new THREE.EdgesGeometry(tempMeshTwo.geometry), new THREE.LineBasicMaterial({color: 0xFFFF00}))

    tempMeshThree.position.x += xPos + 20
    tempMeshThree.position.y += yPos + 7.5
    tempMeshThree.position.z += zPos + 2.5

    tempMeshFour.position.x += xPos + 50
    tempMeshFour.position.y += yPos + 7.5
    tempMeshFour.position.z += zPos + 2.5

    this.lineMeshArr.push(tempMeshThree)
    this.lineMeshArr.push(tempMeshFour)
  }
  
  //모델 초기 설정을 위한 함수(Body 구현)
  makeModelTwo(xPos, yPos, zPos) {
    let vertices = new Float32Array( [
      0, 0, 0,
      0, 10, 0,
      10, 10, 0,
      10, 5, 0,
      30, 5, 0,
      30, 10, 0,
      40, 10, 0,
      40, 5, 0,
      60, 5, 0,
      60, 10, 0,
      70, 10, 0,
      70, 0, 0,
      60, 0, 0,
      40, 0, 0,
      30, 0, 0,
      10, 0, 0,
      0, 0, 5,
      0, 10, 5,
      10, 10, 5,
      10, 5, 5,
      30, 5, 5,
      30, 10, 5,
      40, 10, 5,
      40, 5, 5,
      60, 5, 5,
      60, 10, 5,
      70, 10, 5,
      70, 0, 5,
      60, 0, 5,
      40, 0, 5,
      30, 0, 5,
      10, 0, 5
    ] );

    let geometry = new THREE.BufferGeometry()

    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(vertices), 3));
    geometry.setIndex([
      2, 0, 1, 2, 15, 0,
      4, 15, 3, 4, 14, 15,
      5, 6, 14, 6, 13, 14,
      7, 8, 13, 8, 12, 13,
      12, 9, 10, 10, 11, 12,
      18, 17, 16, 18, 16, 31,
      19, 31, 20, 20, 31, 30,
      22, 21, 30, 29, 22, 30,
      24, 23, 29, 24, 29, 28,
      28, 26, 25, 27, 26, 28,
      0, 11, 16, 16, 11, 27,
      16, 17, 1, 16, 1, 0,
      18, 2, 1, 18, 1, 17,
      3, 18, 19, 3, 2, 18,
      20, 4, 3, 20, 3, 19,
      21, 5, 4, 20, 21, 4,
      22, 6, 5, 22, 5, 21,
      22, 7, 6, 22, 23, 7,
      24, 8, 7, 24, 7, 23,
      25, 9, 8, 25, 8, 24,
      26, 10, 9, 26, 9, 25,
      26, 27, 11, 11, 10, 26
    ])

    let tempModelMesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial( { color: 0xEA68A2 } ))

    tempModelMesh.position.x += xPos
    tempModelMesh.position.y += yPos
    tempModelMesh.position.z += zPos

    this.modelMeshArr.push(tempModelMesh)

    geometry = new THREE.BufferGeometry()

    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(vertices), 3));
    geometry.setIndex([
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0,
      16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 16,
      17, 1, 2, 18, 19, 3, 4, 20, 21, 5, 6, 22, 23, 7, 8, 24, 25, 9, 10, 26, 27, 11, 12
    ])

    let tempLineMesh = new THREE.Line(geometry, new THREE.LineBasicMaterial({color: 0xFFFF00}))

    tempLineMesh.position.x += xPos
    tempLineMesh.position.y += yPos
    tempLineMesh.position.z += zPos

    this.lineMeshArr.push(tempLineMesh)
  }
  
  //모델 초기 설정을 위한 함수(Gate 구현)
  makeModelThree(xPos, yPos, zPos) {
    let tempMesh = new THREE.Mesh(new THREE.BoxGeometry(20, 2, 5), new THREE.MeshBasicMaterial( {color: 0x666666} ))

    tempMesh.position.x = xPos + 35
    tempMesh.position.y = yPos + 11
    tempMesh.position.z = zPos + 2.5

    this.modelMeshArr.push(tempMesh)

    let lineMesh = new THREE.LineSegments(new THREE.EdgesGeometry(tempMesh.geometry), new THREE.LineBasicMaterial({color: 0xFFFF00}))

    lineMesh.position.x = xPos + 35
    lineMesh.position.y = yPos + 11
    lineMesh.position.z = zPos + 2.5

    this.lineMeshArr.push(lineMesh)
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
    this.electronMeshArr[indexNum].position.x = Math.random() * (20 - 2 * this.electronRadius) + this.electronRadius + 10 + this.modelPos[0]
    this.electronMeshArr[indexNum].position.y = Math.random() * (5 - 2 * this.electronRadius) + this.electronRadius + 5 + this.modelPos[1]
    this.electronMeshArr[indexNum].position.z = Math.random() * (5 - 2 * this.electronRadius) + this.electronRadius + this.modelPos[2]
    this.electronDestArr[indexNum][0] = Math.random() * (20 - 2 * this.electronRadius) + this.electronRadius + 40 + this.modelPos[0]
    this.electronDestArr[indexNum][1] = Math.random() * (5 - 2 * this.electronRadius) + this.electronRadius + 5 + this.modelPos[1]
    this.electronDestArr[indexNum][2] = Math.random() * (5 - 2 * this.electronRadius) + this.electronRadius + this.modelPos[2]
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
camera.position.set(0, 0, 30);

//무대 선언
const scene = new THREE.Scene();


//다이오드 객체 정의
const newMOS = new Mosfet(3, 1, 0, 0)
//모델 초기 설정
newMOS.initModel(-35, -5, -2.5, scene)
newMOS.initAnimation()

//마우스를 사용한 카메라의 이동, 줌 설정
const controls = new OrbitControls(camera, renderer.domElement)

//애니메이션 함수
function animate()	{
  //애니메이션 반복 코드
	requestAnimationFrame(animate)

  //렌더 업데이트
	renderer.render(scene, camera)

  newMOS.loopAnimation()
}

gui.add(guiVar.MOSFET, 'gateSourceVoltage', -3, 3).onChange(() => {
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
})

//애니메이션 시작(필수)
animate()
