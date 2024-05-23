import { Link } from "@mui/material"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Paper from "@mui/material/Paper"
import Step from "@mui/material/Step"
import StepContent from "@mui/material/StepContent"
import StepLabel from "@mui/material/StepLabel"
import Stepper from "@mui/material/Stepper"
import Typography from "@mui/material/Typography"
import * as React from "react"
import { ExternalLink } from "src/components/ExternalLink"

const steps = [
  {
    description: (
      <>
        Visit Etherscan mouseover the More navigation button and click on{" "}
        <ExternalLink href="https://etherscan.io/exportData">CSV Export</ExternalLink>.
        <br />
        <br />
        <a href="/app-data/help/etherscan/step1.png" target="_blank" rel="noreferrer">
          <img
            height={217}
            width={433}
            src="/app-data/help/etherscan/step1.png"
            alt="Step visualization"
          />
        </a>
      </>
    ),
    label: "Visit the csv export page",
  },
  {
    description: (
      <>
        Input the address of your wallet, select a broad time range and click on <u>Download</u>
        .
        <br />
        <br />
        <a href="/app-data/help/etherscan/step2.png" target="_blank" rel="noreferrer">
          <img
            height={249}
            width={433}
            src="/app-data/help/etherscan/step2.png"
            alt="Step visualization"
          />
        </a>
      </>
    ),
    label: "Export normal transactions",
  },
  {
    description: (
      <>
        Change export type to <i>Internal Transactions</i>, input the address of your wallet, select
        a broad time range and click on <u>Download</u>
        .
        <br />
        <br />
        <a href="/app-data/help/etherscan/step3.png" target="_blank" rel="noreferrer">
          <img
            height={249}
            width={433}
            src="/app-data/help/etherscan/step3.png"
            alt="Step visualization"
          />
        </a>
      </>
    ),
    label: "Export internal transactions",
  },
  {
    description: (
      <>
        Change export type to <i>ERC20 Transactions</i>, input the address of your wallet, select a
        broad time range and click on <u>Download</u>
        .
        <br />
        <br />
        <a href="/app-data/help/etherscan/step4.png" target="_blank" rel="noreferrer">
          <img
            height={249}
            width={433}
            src="/app-data/help/etherscan/step4.png"
            alt="Step visualization"
          />
        </a>
      </>
    ),
    label: "Export ERC20 transactions",
  },
]

export function EtherscanHelp() {
  const [activeStep, setActiveStep] = React.useState(0)

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  return (
    <>
      <Paper sx={{ padding: 2 }}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel
              // optional={index === 2 ? <Typography variant="caption">Last step</Typography> : null}
              >
                {step.label}
              </StepLabel>
              <StepContent>
                <Typography variant="body2">{step.description}</Typography>
                <Box sx={{ marginTop: 2 }}>
                  <div>
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ marginRight: 1, marginTop: 1 }}
                    >
                      {index === steps.length - 1 ? "Finish" : "Continue"}
                    </Button>
                    <Button
                      disabled={index === 0}
                      onClick={handleBack}
                      sx={{ marginRight: 1, marginTop: 1 }}
                    >
                      Back
                    </Button>
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Box paddingTop={2}>
            <Typography variant="body2">Congratulations!</Typography>
            <Typography variant="body2" color="text.secondary">
              Now you can drag and drop the files to Privatefolio to get started.
            </Typography>
            <br />
            <Link
              onClick={handleReset}
              sx={{ cursor: "pointer", marginTop: 1 }}
              variant="body2"
              underline="hover"
              color="text.secondary"
            >
              Retake the steps.
            </Link>
          </Box>
        )}
      </Paper>
    </>
  )
}
