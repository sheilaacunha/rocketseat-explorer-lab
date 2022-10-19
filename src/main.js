import "./css/index.css"
import IMask from "imask"

const ccBgColor01 = document.querySelector(".cc-bg svg > g g:nth-child(1) path")
const ccBgColor02 = document.querySelector(".cc-bg svg > g g:nth-child(2) path")

const ccLogo = document.querySelector(".cc-logo span:nth-child(2) img")

function setCardType(type) {
  const colors = {
    visa: ["#436D99", "#2D57f2"],
    master: ["#DF6F29", "#C69347"],
    default: ["black", "gray"],
  }
  ccBgColor01.setAttribute("fill", colors[type][0])
  ccBgColor02.setAttribute("fill", colors[type][1])
  ccLogo.setAttribute("src", `cc-${type}.svg`)
}

setCardType("visa")

globalThis.setCardType = setCardType

// codigo de verificação
const securityCode = document.querySelector("#security-code")

const securityCodePattern = {
  mask: "0000",
}
const securityCodeMasked = IMask(securityCode, securityCodePattern)
// data de experição
const expirationDate = document.querySelector("#expiration-date")

const expirationDatePattern = {
  mask: "MM{/}YY",
  blocks: {
    YY: {
      mask: IMask.MaskedRange,
      from: String(new Date().getFullYear()).slice(2), // serve pra pegar o ano atual e o slive para erduzir apenas a 2 digitos
      to: String(new Date().getFullYear() + 10).slice(2), // o mais 10 é para ate 10 anos a seguir
    },
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12,
    },
  },
}

const expirationDateMasked = IMask(expirationDate, expirationDatePattern)

const cardNumber = document.querySelector("#card-number")
const cardNumberPattern = {
  mask: [
    {
      mask: "0000 0000 0000 0000",
      regex: /^4\d{0,15}/,
      cardtype: "visa",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})|d{0,12}/,
      cardtype: "mastercard",
    },
    {
      mask: "0000 0000 0000 0000",
      cardtype: "default",
    },
  ],
  dispatch: function (appended, dynamicMasked) {
    const number = (dynamicMasked.value + appended).replace(/\D/g, "")

    const foundMask = dynamicMasked.compiledMasks.find(function (item) {
      return number.match(item.regex)
    })
    return foundMask
  },
}

const cardNumberMasked = IMask(cardNumber, cardNumberPattern)
// const cardsDynamicMasks = [
//   {
//     mask: "0000 000000 00000",
//     regex: /^3[47]\d{0,13}/,
//     cardtype: "american express",
//   },
//   {
//     mask: "0000 0000 0000 0000",
//     regex: /^(?:6011|65\d{0,2}|64[4-9]\d?)\d{0,12}/,
//     cardtype: "discover",
//   },
//   {
//     mask: "0000 000000 0000",
//     regex: /^3(?:0([0-5]|9)|[689]\d?)\d{0,11}/,
//     cardtype: "diners",
//   },
//   {
//     mask: "0000 0000 0000 0000",
//     regex: /^(5[1-5]\d{0,2}|22[2-9]\d{0,1}|2[3-7]\d{0,2})\d{0,12}/,
//     cardtype: "mastercard",
//   },
//   {
//     mask: "0000 000000 00000",
//     regex: /^(?:2131|1800)\d{0,11}/,
//     cardtype: "jcb15",
//   },
//   {
//     mask: "0000 0000 0000 0000",
//     regex: /^(?:35\d{0,2})\d{0,12}/,
//     cardtype: "jcb",
//   },
//   {
//     mask: "0000 0000 0000 0000",
//     regex: /^(?:5[0678]\d{0,2}|6304|67\d{0,2})\d{0,12}/,
//     cardtype: "maestro",
//   },
//   {
//     mask: "0000 0000 0000 0000",
//     regex: /^4\d{0,15}/,
//     cardtype: "visa",
//   },
//   {
//     mask: "0000 0000 0000 0000",
//     regex: /^62\d{0,14}/,
//     cardtype: "unionpay",
//   },
// ]
