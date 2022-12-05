import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js';
import * as dat from 'https://cdn.skypack.dev/dat.gui';

let animationPhase = 0
let animationEndFlag = 0

var options = {
  next_animation: function()  {
    if(animationEndFlag == 0) {
      animationPhase += 1
      animationEndFlag = 1
    }
  }
}

//gui 설정
var gui = new dat.GUI({autoPlace: false});
gui.add(options, 'next_animation')

//캔버스 설정
var myCanvas = document.querySelector('canvas.three_content')
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


let modelMeshArr = []
let colorArr = [0xbbe0e3, 0x7f7f7f, 0xa3a3e0, 0x333399, 0xe6e6e6, 0xffff00, 0xff0000, 0xffc000]

let modelLength = [
  [10, 3, 9, 3, 10],
  [10, 3, 3, 3, 3, 3, 10, 3],
  [10, 15, 10],
  [10, 10],
  [10, 10],
  [10, 6, 3, 6, 10],
  [3, 3],
  [3, 3, 3, 3, 3, 3, 3]
]

modelMeshArr.push([])
for(let i = 0; i < modelLength[0].length; i++)  {
  modelMeshArr[0].push(new THREE.Mesh(new THREE.BoxGeometry(modelLength[0][i], 10, 5), new THREE.MeshBasicMaterial({color: colorArr[0]})))
  scene.add(modelMeshArr[0][i])
}

modelMeshArr[0][0].position.x -= 12.5
modelMeshArr[0][1].position.x -= 6
modelMeshArr[0][3].position.x += 6
modelMeshArr[0][4].position.x += 12.5

modelMeshArr.push([])
for(let i = 0; i < modelLength[1].length; i++)  {
  modelMeshArr[1].push(new THREE.Mesh(new THREE.BoxGeometry(modelLength[1][i], 3, 5), new THREE.MeshBasicMaterial({color: colorArr[1]})))
  modelMeshArr[1][i].position.y += 6.5
  scene.add(modelMeshArr[1][i])
}

modelMeshArr[1][0].position.x -= 12.5
modelMeshArr[1][1].position.x -= 6
modelMeshArr[1][2].position.x -= 3
modelMeshArr[1][4].position.x += 3
modelMeshArr[1][5].position.x += 6
modelMeshArr[1][6].position.x += 12.5
modelMeshArr[1][7].visible = false
modelMeshArr[1][7].geometry = new THREE.BoxGeometry(modelLength[1][7], 0, 5)

modelMeshArr.push([])
for(let i = 0; i < modelLength[2].length; i++)  {
  modelMeshArr[2].push(new THREE.Mesh(new THREE.BoxGeometry(modelLength[2][i], 0, 5), new THREE.MeshBasicMaterial({color: colorArr[2]})))
  modelMeshArr[2][i].position.y += 8
  scene.add(modelMeshArr[2][i])
  modelMeshArr[2][i].visible = false
}

modelMeshArr[2][0].position.x -= 12.5
modelMeshArr[2][2].position.x += 12.5

modelMeshArr.push([])
for(let i = 0; i < modelLength[3].length; i++)  {
  modelMeshArr[3].push(new THREE.Mesh(new THREE.BoxGeometry(modelLength[3][i], 0, 5), new THREE.MeshBasicMaterial({color: colorArr[3]})))
  modelMeshArr[3][i].position.y += 5
  scene.add(modelMeshArr[3][i])
  modelMeshArr[3][i].visible = false
}

modelMeshArr[3][0].position.x -= 12.5
modelMeshArr[3][1].position.x += 12.5

modelMeshArr.push([])
for(let i = 0; i < modelLength[4].length; i++)  {
  modelMeshArr[4].push(new THREE.Mesh(new THREE.BoxGeometry(modelLength[4][i], 0, 5), new THREE.MeshBasicMaterial({color: colorArr[4]})))
  modelMeshArr[4][i].position.y += 5
  scene.add(modelMeshArr[4][i])
  modelMeshArr[4][i].visible = false
}

modelMeshArr[4][0].position.x -= 12.5
modelMeshArr[4][1].position.x += 12.5

modelMeshArr.push([])
for(let i = 0; i < modelLength[5].length; i++)  {
  modelMeshArr[5].push(new THREE.Mesh(new THREE.BoxGeometry(modelLength[5][i], 0, 5), new THREE.MeshBasicMaterial({color: colorArr[5]})))
  scene.add(modelMeshArr[5][i])
  modelMeshArr[5][i].visible = false
}

modelMeshArr[5][0].position.x -= 12.5
modelMeshArr[5][1].position.x -= 4.5
modelMeshArr[5][3].position.x += 4.5
modelMeshArr[5][4].position.x += 12.5
modelMeshArr[5][0].position.y += 8
modelMeshArr[5][1].position.y += 6
modelMeshArr[5][2].position.y += 6
modelMeshArr[5][3].position.y += 6
modelMeshArr[5][4].position.y += 8

modelMeshArr.push([])
for(let i = 0; i < modelLength[6].length; i++)  {
  modelMeshArr[6].push(new THREE.Mesh(new THREE.BoxGeometry(modelLength[6][i], 0, 5), new THREE.MeshBasicMaterial({color: colorArr[6]})))
  scene.add(modelMeshArr[6][i])
  modelMeshArr[6][i].visible = false
}

modelMeshArr[6][0].position.x -= 6
modelMeshArr[6][1].position.x += 6
modelMeshArr[6][0].position.y += 5
modelMeshArr[6][1].position.y += 5

modelMeshArr.push([])
for(let i = 0; i < modelLength[7].length; i++)  {
  modelMeshArr[7].push(new THREE.Mesh(new THREE.BoxGeometry(modelLength[7][i], 0, 5), new THREE.MeshBasicMaterial({color: colorArr[7]})))
  scene.add(modelMeshArr[7][i])
  modelMeshArr[7][i].visible = false
}

modelMeshArr[7][0].position.x -= 6
modelMeshArr[7][1].position.x -= 3
modelMeshArr[7][3].position.x += 3
modelMeshArr[7][4].position.x += 6
modelMeshArr[7][5].position.x -= 6
modelMeshArr[7][6].position.x += 6
modelMeshArr[7][0].position.y += 5
modelMeshArr[7][1].position.y += 8
modelMeshArr[7][2].position.y += 9.5
modelMeshArr[7][3].position.y += 8
modelMeshArr[7][4].position.y += 5
modelMeshArr[7][5].position.y += 9.5
modelMeshArr[7][6].position.y += 9.5

for(let i = 0; i < modelMeshArr.length; i++) {
  for(let j = 0; j < modelMeshArr[i].length; j++)  {
    modelMeshArr[i][j].material.transparent = true
  }
}


function animationLoop() {
  switch(animationPhase)  {
    case 1:
      if(modelMeshArr[2][0].geometry.parameters.height < 3)  {
        for(let i = 0; i < modelMeshArr[2].length; i++)  {
          modelMeshArr[2][i].visible = true
          modelMeshArr[2][i].geometry = new THREE.BoxGeometry(modelLength[2][i], modelMeshArr[2][i].geometry.parameters.height + 0.02, 5)
          modelMeshArr[2][i].position.y += 0.01
        }
      } else {
        animationEndFlag = 0
      }
      break
    case 2:
      let tempArrTwo = [[1, 0], [1, 6], [2, 0], [2, 2]]
      if(modelMeshArr[2][0].material.opacity > 0) {
        for(let i = 0; i < tempArrTwo.length; i++) {
          modelMeshArr[tempArrTwo[i][0]][tempArrTwo[i][1]].material.opacity -= 0.01
          modelMeshArr[tempArrTwo[i][0]][tempArrTwo[i][1]].position.y += 0.05
        }
      } else {
        animationEndFlag = 0
      }
      break
    case 3:
      modelMeshArr[3][0].visible = true
      modelMeshArr[3][1].visible = true
      let tempArrThree = [[0, 0], [0, 4], [3, 0], [3, 1]]
      if(modelMeshArr[3][0].geometry.parameters.height < 2) {
        for(let i = 0; i < tempArrThree.length; i++) {
          if(i < 2) {
            let tempHeight = modelMeshArr[tempArrThree[i][0]][tempArrThree[i][1]].geometry.parameters.height
            modelMeshArr[tempArrThree[i][0]][tempArrThree[i][1]].geometry = new THREE.BoxGeometry(modelLength[tempArrThree[i][0]][tempArrThree[i][1]], tempHeight - 0.02, 5)
            modelMeshArr[tempArrThree[i][0]][tempArrThree[i][1]].position.y -= 0.01
          } else {
            let tempHeight = modelMeshArr[tempArrThree[i][0]][tempArrThree[i][1]].geometry.parameters.height
            modelMeshArr[tempArrThree[i][0]][tempArrThree[i][1]].geometry = new THREE.BoxGeometry(modelLength[tempArrThree[i][0]][tempArrThree[i][1]], tempHeight + 0.02, 5)
            modelMeshArr[tempArrThree[i][0]][tempArrThree[i][1]].position.y -= 0.01
          }
        }
      } else {
        animationEndFlag = 0
      }
      break
    case 4:
      if(modelMeshArr[4][0].geometry.parameters.height < 3) {
        modelMeshArr[4][0].visible = true
        modelMeshArr[4][1].visible = true
        modelMeshArr[4][0].geometry = new THREE.BoxGeometry(modelLength[4][0], modelMeshArr[4][0].geometry.parameters.height + 0.02, 5)
        modelMeshArr[4][1].geometry = new THREE.BoxGeometry(modelLength[4][1], modelMeshArr[4][1].geometry.parameters.height + 0.02, 5)
        modelMeshArr[4][0].position.y += 0.01
        modelMeshArr[4][1].position.y += 0.01
      } else {
        animationEndFlag = 0
      }
      break
    case 5:
      let tempArrFive = [[1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [2, 1]]
      if(modelMeshArr[1][1].material.opacity > 0) {
        for(let i = 0; i < tempArrFive.length; i++) {
          modelMeshArr[tempArrFive[i][0]][tempArrFive[i][1]].material.opacity -= 0.01
          modelMeshArr[tempArrFive[i][0]][tempArrFive[i][1]].position.y += 0.05
        }
      } else {
        animationEndFlag = 0
        for(let i = 1; i < 6; i++) {
          modelMeshArr[1][i].visible = false
          modelMeshArr[1][i].position.y = 5
          modelMeshArr[1][i].geometry = new THREE.BoxGeometry(modelLength[1][i], 0, 5)
        }
      }
      break
    case 6:
      for(let i = 1; i < 6; i++)  {
        modelMeshArr[1][i].visible = true
        modelMeshArr[1][i].material.opacity = 1
      }
      if(modelMeshArr[1][1].geometry.parameters.height < 1) {
        for(let i = 1; i < 6; i++)  {
          modelMeshArr[1][i].geometry = new THREE.BoxGeometry(modelLength[1][i], modelMeshArr[1][i].geometry.parameters.height + 0.02, 5)
          modelMeshArr[1][i].position.y += 0.01
        }
      } else {
        animationEndFlag = 0
      }
      break
    case 7:
      let tempHeightSeven = [2, 4, 2, 4, 2]
      for(let i = 0; i < modelMeshArr[5].length; i++) {
        modelMeshArr[5][i].visible = true
      }
      if(modelMeshArr[5][1].geometry.parameters.height < 4) {
        for(let i = 0; i < modelMeshArr[5].length; i++) {
          if(modelMeshArr[5][i].geometry.parameters.height < tempHeightSeven[i])  {
            modelMeshArr[5][i].geometry = new THREE.BoxGeometry(modelLength[5][i], modelMeshArr[5][i].geometry.parameters.height + 0.02, 5)
            modelMeshArr[5][i].position.y += 0.01
          }
        }
      } else {
        animationEndFlag = 0
      }
      break
    case 8:
      if(modelMeshArr[5][0].material.opacity > 0) {
        for(let i = 0; i < 5; i++)  {
          if(i != 2)  {
            modelMeshArr[5][i].material.opacity -= 0.01
            modelMeshArr[5][i].position.y += 0.02
          }
        }
      } else {
        animationEndFlag = 0
      }
      break
    case 9:
      if(modelMeshArr[6][0].geometry.parameters.height < 2) {
        modelMeshArr[6][0].visible = true
        modelMeshArr[6][1].visible = true
        modelMeshArr[6][0].geometry = new THREE.BoxGeometry(modelLength[6][0], modelMeshArr[6][0].geometry.parameters.height + 0.02, 5)
        modelMeshArr[6][1].geometry = new THREE.BoxGeometry(modelLength[6][1], modelMeshArr[6][1].geometry.parameters.height + 0.02, 5)
        modelMeshArr[6][0].position.y -= 0.01
        modelMeshArr[6][1].position.y -= 0.01
        modelMeshArr[0][1].geometry = new THREE.BoxGeometry(modelLength[0][1], modelMeshArr[0][1].geometry.parameters.height - 0.02, 5)
        modelMeshArr[0][3].geometry = new THREE.BoxGeometry(modelLength[0][3], modelMeshArr[0][3].geometry.parameters.height - 0.02, 5)
        modelMeshArr[0][1].position.y -= 0.01
        modelMeshArr[0][3].position.y -= 0.01
        for(let i = 1; i < 6; i++)  {
          if(i != 3)  {
            modelMeshArr[1][i].material.opacity -= 0.01
            modelMeshArr[1][i].position.y += 0.05
          }
        }
      } else {
        animationEndFlag = 0
        let tempPosNine = [8, 5, 5, 5.5, 5, 5, 8, 8]
        for(let i = 0; i < 8; i++)  {
          modelMeshArr[1][i].position.y = tempPosNine[i]
          if(i != 3)  {
            modelMeshArr[1][i].geometry = new THREE.BoxGeometry(modelLength[1][i], 0, 5)
            modelMeshArr[1][i].visible = false
          }
        }
      }
      break
    case 10:
      let tempHeightTen = [2, 3, 3, 0, 3, 3, 2, 1.5]
      if(modelMeshArr[1][1].geometry.parameters.height < 3) {
        for(let i = 0; i < 8; i++)  {
          modelMeshArr[1][i].material.opacity = 1
          modelMeshArr[1][i].visible = true
          if(modelMeshArr[1][i].geometry.parameters.height < tempHeightTen[i])  {
            modelMeshArr[1][i].geometry = new THREE.BoxGeometry(modelLength[1][i], modelMeshArr[1][i].geometry.parameters.height + 0.02, 5)
            modelMeshArr[1][i].position.y += 0.01
          }
        }
      } else {
        animationEndFlag = 0
      }
      break
    case 11:
      if(modelMeshArr[1][1].material.opacity > 0) {
        modelMeshArr[1][1].material.opacity -= 0.01
        modelMeshArr[1][1].position.y += 0.05
        modelMeshArr[1][5].material.opacity -= 0.01
        modelMeshArr[1][5].position.y += 0.05
      } else {
        animationEndFlag = 0
      }
      break
    case 12:
      for(let i = 0; i < 5; i++)  {
        modelMeshArr[7][i].visible = true
      }
      let tempHeightEleven = [4.5, 2, 0.5, 2, 4.5, 0.5, 0.5]
      if(modelMeshArr[7][5].geometry.parameters.height < 0.5)  {
        for(let i = 0; i < 7; i++)  {
          if(modelMeshArr[7][i].geometry.parameters.height < tempHeightEleven[i]) {
            if(i < 5 || (i == 5 && modelMeshArr[7][0].geometry.parameters.height >= tempHeightEleven[0]) || (i == 6 && modelMeshArr[7][4].geometry.parameters.height >= tempHeightEleven[4]))  {
              if(modelMeshArr[7][0].geometry.parameters.height >= tempHeightEleven[0])  {
                modelMeshArr[7][5].visible = true
                modelMeshArr[7][6].visible = true
              }
              modelMeshArr[7][i].geometry = new THREE.BoxGeometry(modelLength[7][i], modelMeshArr[7][i].geometry.parameters.height + 0.02, 5)
              modelMeshArr[7][i].position.y += 0.01
            }
          }
        }
      } else {
        animationEndFlag = 0
      }
      break
    case 13:
      for(let i = 0; i < 7; i++)  {
        if(i != 0 && i != 4)  {
          modelMeshArr[7][i].material.opacity -= 0.01
          modelMeshArr[7][i].position.y += 0.05
        }
      }
      break;
  }
}

//마우스를 사용한 카메라의 이동, 줌 설정
new OrbitControls(camera, renderer.domElement)

//애니메이션 함수
function animate()	{
  //애니메이션 반복 코드
	requestAnimationFrame(animate)

  //렌더 업데이트
	renderer.render(scene, camera)

  animationLoop()
}

//애니메이션 시작(필수)
animate()
