import React, { Component } from "react"
import ReactUtterences from "react-utterances"

const repo = "Bziaco/blog"

class Utterances extends Component {
  render() {
    return (
      <div>
        <ReactUtterences repo={repo} type={"pathname"} />
      </div>
    )
  }
}

export default Utterances
