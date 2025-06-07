"use client";

import { useEffect, useRef, useState } from "react";

export default function WebGLBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const programInfoRef = useRef<any>(null);
  const buffersRef = useRef<any>(null);
  const [isWebGLSupported, setIsWebGLSupported] = useState(true);
  const [, setTime] = useState(0);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const [resolution, setResolution] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const gl = canvas.getContext("webgl");

    if (!gl) {
      console.error("WebGL not supported");
      setIsWebGLSupported(false);
      return;
    }

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
      setResolution({ width: canvas.width, height: canvas.height });
    };

    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Vertex shader program
    const vsSource = `
      attribute vec4 aVertexPosition;
      attribute vec2 aTextureCoord;

      varying highp vec2 vTextureCoord;

      void main(void) {
        gl_Position = aVertexPosition;
        vTextureCoord = aTextureCoord;
      }
    `;

    // Fragment shader program
    const fsSource = `
      precision highp float;
      varying highp vec2 vTextureCoord;
      uniform float uTime;
      uniform vec2 uMouse;
      uniform vec2 uResolution;

      // Simplex noise function
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

      float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy));
        vec2 x0 = v - i + dot(i, C.xx);
        vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod289(i);
        vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
        vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
        m = m*m;
        m = m*m;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
        vec3 g;
        g.x = a0.x * x0.x + h.x * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

      // Voronoi noise
      vec2 random2(vec2 p) {
        return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
      }

      float voronoi(vec2 x) {
        vec2 n = floor(x);
        vec2 f = fract(x);
        
        float minDist = 1.0;
        for(int j = -1; j <= 1; j++) {
          for(int i = -1; i <= 1; i++) {
            vec2 rnd = random2(n + vec2(i, j));
            rnd = 0.5 + 0.5 * sin(uTime * 0.5 + 6.2831 * rnd);
            vec2 diff = vec2(i, j) + rnd - f;
            float dist = length(diff);
            minDist = min(minDist, dist);
          }
        }
        
        return minDist;
      }

      // Hexagonal grid
      vec2 hexCoords(vec2 uv) {
        float r = 1.0;
        float h = 0.5 * sqrt(3.0);
        float a = 2.0 * h / 3.0;
        float b = r / 2.0;
        
        vec2 p = mod(uv, vec2(r + b, 2.0 * h));
        vec2 c1 = vec2(b, 0);
        vec2 c2 = vec2(r + b, 0);
        vec2 c3 = vec2(0, h);
        vec2 c4 = vec2(r, h);
        vec2 c5 = vec2(b, 2.0 * h);
        vec2 c6 = vec2(r + b, 2.0 * h);
        
        float d1 = length(p - c1);
        float d2 = length(p - c2);
        float d3 = length(p - c3);
        float d4 = length(p - c4);
        float d5 = length(p - c5);
        float d6 = length(p - c6);
        
        float m = min(min(min(d1, d2), min(d3, d4)), min(d5, d6));
        
        return vec2(m, 0.0);
      }

      void main(void) {
        vec2 uv = vTextureCoord;
        
        // Center the coordinates
        uv = uv * 2.0 - 1.0;
        
        // Adjust aspect ratio
        uv.x *= uResolution.x / uResolution.y;
        
        // Mouse influence
        vec2 mouseOffset = (uMouse - 0.5) * 0.1;
        uv += mouseOffset;
        
        // Create a base color - completely dark
        vec3 color = vec3(0.0, 0.0, 0.0);
        
        // Distance from center
        float dist = length(uv);
        
        // Minimal pattern visibility
        float circle = smoothstep(1.0, 0.0, dist);
        
        // Add very subtle noise patterns
        for (float i = 1.0; i < 3.0; i++) {
          float t = uTime * 0.1 / i;
          float scale = 3.0 + i * 0.5;
          vec2 noiseUv = uv * scale + vec2(t, t * 0.5) + mouseOffset * i;
          float noise = snoise(noiseUv);
          
          // Just barely visible dark pattern
          vec3 pattern = vec3(0.02, 0.02, 0.02) * noise * circle * 0.05;
          color += pattern;
          
          // Extremely subtle hexagonal pattern
          vec2 hexUv = uv * (2.0 + i) + vec2(sin(t), cos(t * 0.7));
          float hexPattern = hexCoords(hexUv).x;
          hexPattern = smoothstep(0.1, 0.2, hexPattern);
          color += vec3(0.01, 0.01, 0.01) * (1.0 - hexPattern) * 0.01 * circle;
        }
        
        // Strong vignette to ensure edges are completely dark
        float vignette = 1.0 - dist;
        vignette = smoothstep(0.0, 0.5, vignette);
        color *= vignette;
        
        // Ensure the background stays very dark
        color = min(color, vec3(0.03));
        
        gl_FragColor = vec4(color, 1.0);
      }
    `;

    // Initialize a shader program
    const shaderProgram = initShaderProgram(gl, vsSource, fsSource);

    if (!shaderProgram) {
      setIsWebGLSupported(false);
      return;
    }

    // Collect all the info needed to use the shader program
    const programInfo = {
      program: shaderProgram,
      attribLocations: {
        vertexPosition: gl.getAttribLocation(shaderProgram, "aVertexPosition"),
        textureCoord: gl.getAttribLocation(shaderProgram, "aTextureCoord"),
      },
      uniformLocations: {
        time: gl.getUniformLocation(shaderProgram, "uTime"),
        mouse: gl.getUniformLocation(shaderProgram, "uMouse"),
        resolution: gl.getUniformLocation(shaderProgram, "uResolution"),
      },
    };

    programInfoRef.current = programInfo;

    // Create the buffers
    const buffers = initBuffers(gl);
    buffersRef.current = buffers;

    // Draw the scene initially
    // drawScene(gl, programInfo, buffers, time, mouse, resolution)

    let then = 0;
    // Draw the scene repeatedly
    function render(now: number) {
      now *= 0.001; // convert to seconds
      then = now;
      setTime(now);

      // drawScene(gl, programInfo, buffers, now, mouse, resolution)
      drawScene(
        gl!,
        programInfo,
        buffers,
        now,
        mouse,
        resolution,
        shaderProgram!
      );

      requestAnimationFrame(render);
    }
    requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Initialize the buffers
  function initBuffers(gl: WebGLRenderingContext) {
    // Create a buffer for the square's positions
    const positionBuffer = gl.createBuffer();

    // Select the positionBuffer as the one to apply buffer operations to
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    // Create an array of positions for the square
    const positions = [-1.0, 1.0, 1.0, 1.0, -1.0, -1.0, 1.0, -1.0];

    // Pass the list of positions into WebGL to build the shape
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    // Create a buffer for texture coordinates
    const textureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);

    // Create an array of texture coordinates
    const textureCoordinates = [0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0];

    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array(textureCoordinates),
      gl.STATIC_DRAW
    );

    return {
      position: positionBuffer,
      textureCoord: textureCoordBuffer,
    };
  }

  // Draw the scene
  function drawScene(
    gl: WebGLRenderingContext,
    programInfo: any,
    buffers: any,
    time: number,
    mouse: { x: number; y: number },
    resolution: { width: number; height: number },
    shaderProgram: WebGLProgram
  ) {
    if (!programInfo || !buffers) return;

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clearDepth(1.0);
    gl.disable(gl.DEPTH_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Tell WebGL to use our program when drawing
    // gl.useProgram(programInfo.program)
    gl.useProgram(shaderProgram);

    // Set the shader uniforms
    gl.uniform1f(programInfo.uniformLocations.time, time);
    gl.uniform2f(programInfo.uniformLocations.mouse, mouse.x, mouse.y);
    gl.uniform2f(
      programInfo.uniformLocations.resolution,
      resolution.width,
      resolution.height
    );

    // Tell WebGL how to pull out the positions from the position buffer
    {
      const numComponents = 2; // pull out 2 values per iteration
      const type = gl.FLOAT; // the data in the buffer is 32bit floats
      const normalize = false; // don't normalize
      const stride = 0; // how many bytes to get from one set of values to the next
      const offset = 0; // how many bytes inside the buffer to start from
      gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
      gl.vertexAttribPointer(
        programInfo.attribLocations.vertexPosition,
        numComponents,
        type,
        normalize,
        stride,
        offset
      );
      gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
    }

    // Tell WebGL how to pull out the texture coordinates from buffer
    {
      const numComponents = 2;
      const type = gl.FLOAT;
      const normalize = false;
      const stride = 0;
      const offset = 0;
      gl.bindBuffer(gl.ARRAY_BUFFER, buffers.textureCoord);
      gl.vertexAttribPointer(
        programInfo.attribLocations.textureCoord,
        numComponents,
        type,
        normalize,
        stride,
        offset
      );
      gl.enableVertexAttribArray(programInfo.attribLocations.textureCoord);
    }

    // Draw the square
    {
      const offset = 0;
      const vertexCount = 4;
      gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount);
    }
  }

  // Initialize a shader program
  function initShaderProgram(
    gl: WebGLRenderingContext,
    vsSource: string,
    fsSource: string
  ) {
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

    if (!vertexShader || !fragmentShader) {
      return null;
    }

    // Create the shader program
    const shaderProgram = gl.createProgram();
    if (!shaderProgram) {
      return null;
    }

    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    // If creating the shader program failed, alert
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      console.error(
        "Unable to initialize the shader program: " +
          gl.getProgramInfoLog(shaderProgram)
      );
      return null;
    }

    return shaderProgram;
  }

  // Creates a shader of the given type, uploads the source and compiles it
  function loadShader(gl: WebGLRenderingContext, type: number, source: string) {
    const shader = gl.createShader(type);

    if (!shader) {
      console.error("An error occurred creating the shaders");
      return null;
    }

    // Send the source to the shader object
    gl.shaderSource(shader, source);

    // Compile the shader program
    gl.compileShader(shader);

    // See if it compiled successfully
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error(
        "An error occurred compiling the shaders: " +
          gl.getShaderInfoLog(shader)
      );
      gl.deleteShader(shader);
      return null;
    }

    return shader;
  }

  // Fallback gradient if WebGL is not supported
  if (!isWebGLSupported) {
    return (
      <div
        className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-gray-900"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 50%, rgba(255, 107, 0, 0.15), transparent 70%)",
        }}
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full object-cover"
      style={{ position: "absolute", top: 0, left: 0 }}
    />
  );
}
