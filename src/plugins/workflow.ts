interface FlowOptions {
  data: any,
  resolve: (value?: any | PromiseLike<any>) => void,
  reject: (value?: any | PromiseLike<any>) => void
}

type FlowFunction = (option?: FlowOptions) => void

class Workflow {
  private flows: Map<string, FlowFunction> = new Map()

  define(name: string, flow: FlowFunction): void {
    if (this.flows.has(name)) {
      console.warn(`Workflow "${name}" already exists. Override it.`)
    }

    this.flows.set(name, flow)
  }

  start(name: string, data?: any, autoSkip: boolean = false): Promise<any> {
    let flow = this.flows.get(name)

    if (flow === void 0) {
      if (autoSkip) {
        return Promise.resolve(data)
      } else {
        throw new Error(`Workflow "${name}" does not exist.`)
      }
    }

    return new Promise((resolve, reject) => {
      flow({ data, resolve, reject })
    })
  }
}

const workflow = new Workflow()
export default workflow
