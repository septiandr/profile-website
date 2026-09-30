import * as THREE from "three";
import { TECH_NODES, TechNode } from "../types";

export class TechLabRig {
  public group: THREE.Group;
  public nodeMeshes: THREE.Mesh[] = [];
  public connectionLines: THREE.LineSegments;
  public portalRing: THREE.Mesh;
  private linePositions: Float32Array;

  constructor() {
    this.group = new THREE.Group();

    // 1. Create Spatial 3D Technology Nodes (Restrained geometric markers)
    const nodeGeometry = new THREE.OctahedronGeometry(0.12, 0);

    TECH_NODES.forEach((node, idx) => {
      const nodeMat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        emissive: 0x0369a1,
        emissiveIntensity: 0.4,
        roughness: 0.3,
        metalness: 0.8,
        wireframe: false,
      });

      const mesh = new THREE.Mesh(nodeGeometry, nodeMat);
      mesh.position.set(...node.position);
      mesh.userData = { index: idx, nodeData: node };

      // Surrounding subtle telemetry ring
      const ringGeo = new THREE.RingGeometry(0.16, 0.19, 24);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x94a3b8,
        transparent: true,
        opacity: 0.3,
        side: THREE.DoubleSide,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      mesh.add(ring);

      this.group.add(mesh);
      this.nodeMeshes.push(mesh);
    });

    // 2. Connecting Lines between adjacent tech nodes
    const maxLines = TECH_NODES.length * 2;
    this.linePositions = new Float32Array(maxLines * 6);
    let lineIdx = 0;

    for (let i = 0; i < TECH_NODES.length - 1; i++) {
      const p1 = TECH_NODES[i].position;
      const p2 = TECH_NODES[i + 1].position;
      this.linePositions[lineIdx++] = p1[0];
      this.linePositions[lineIdx++] = p1[1];
      this.linePositions[lineIdx++] = p1[2];
      this.linePositions[lineIdx++] = p2[0];
      this.linePositions[lineIdx++] = p2[1];
      this.linePositions[lineIdx++] = p2[2];
    }

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute("position", new THREE.BufferAttribute(this.linePositions, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.2,
    });

    this.connectionLines = new THREE.LineSegments(lineGeometry, lineMaterial);
    this.group.add(this.connectionLines);

    // 3. Subtle Circular Portal (Scene 10)
    const portalGeo = new THREE.TorusGeometry(1.6, 0.04, 16, 64);
    const portalMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.4,
      wireframe: true,
    });
    this.portalRing = new THREE.Mesh(portalGeo, portalMat);
    this.portalRing.position.set(0, 0.2, -1.8);
    this.portalRing.scale.setScalar(0.001); // starts invisible until portal stage
    this.group.add(this.portalRing);

    // Initial group visibility
    this.group.position.set(0, 0, -20);
    this.group.scale.setScalar(0.001);
  }

  public update(delta: number, elapsed: number) {
    // Subtle rotation of nodes & portal
    this.nodeMeshes.forEach((mesh, i) => {
      mesh.rotation.y += delta * 0.8;
      mesh.rotation.x = Math.sin(elapsed * 1.5 + i) * 0.1;
    });

    if (this.portalRing.scale.x > 0.05) {
      this.portalRing.rotation.z += delta * 0.3;
    }
  }

  public activateNode(index: number) {
    if (this.nodeMeshes[index]) {
      const mat = this.nodeMeshes[index].material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 1.2;
      mat.color.setHex(0x38bdf8);
    }
  }

  public dispose() {
    this.nodeMeshes.forEach((m) => {
      m.geometry.dispose();
      (m.material as THREE.Material).dispose();
    });
    this.connectionLines.geometry.dispose();
    (this.connectionLines.material as THREE.Material).dispose();
    this.portalRing.geometry.dispose();
    (this.portalRing.material as THREE.Material).dispose();
  }
}
