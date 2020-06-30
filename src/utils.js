import types from "./auth/serializer/src/types"
import Serializer from "./auth/serializer/src/serializer"
const ByteBuffer = require('bytebuffer')

const {
  uint16,
  uint32,
  string,
  public_key,
  asset
} = types

const snakeCaseRe = /_([a-z])/g;
export function camelCase(str) {
  return str.replace(snakeCaseRe, function(_m, l) {
    return l.toUpperCase();
  });
}

export function validateAccountName(value) {
  let i, label, len, suffix;

  suffix = "Account name should ";
  if (!value) {
    return suffix + "not be empty.";
  }
  const length = value.length;
  if (length < 3) {
    return suffix + "be longer.";
  }
  if (length > 16) {
    return suffix + "be shorter.";
  }
  if (/\./.test(value)) {
    suffix = "Each account segment should ";
  }
  const ref = value.split(".");
  for (i = 0, len = ref.length; i < len; i++) {
    label = ref[i];
    if (!/^[a-z]/.test(label)) {
      return suffix + "start with a letter.";
    }
    if (!/^[a-z0-9-]*$/.test(label)) {
      return suffix + "have only letters, digits, or dashes.";
    }
    if (/--/.test(label)) {
      return suffix + "have only one dash in a row.";
    }
    if (!/[a-z0-9]$/.test(label)) {
      return suffix + "end with a letter or digit.";
    }
    if (!(label.length >= 3)) {
      return suffix + "be longer";
    }
  }
  return null;
}

// Hack to be able to generate a valid witness_set_properties op
// Can hopefully be removed when hived's JSON representation is fixed
const price = new Serializer(
  "price", {
    base: asset,
    quote: asset
  }
);

function serialize(serializer, data) {
  const buffer = new ByteBuffer(
    ByteBuffer.DEFAULT_CAPACITY,
    ByteBuffer.LITTLE_ENDIAN
  );
  serializer.appendByteBuffer(buffer, data);
  buffer.flip();
  return buffer.toString('hex');
}
export function buildWitnessUpdateOp(
  owner,
  props
) {
  const data = {
    extensions: [],
    owner,
    props: []
  };
  for (const key of Object.keys(props)) {
    let type;
    switch (key) {
      case "key":
      case "new_signing_key":
        type = public_key;
        break;
      case "account_subsidy_budget":
      case "account_subsidy_decay":
      case "maximum_block_size":
        type = uint32;
        break;
      case "sbd_interest_rate":
        type = uint16;
        break;
      case "url":
        type = string;
        break;
      case "sbd_exchange_rate":
        type = price;
        break;
      case "account_creation_fee":
        type = asset;
        break;
      default:
        throw new Error(`Unknown witness prop: ${key}`);
    }
    data.props.push([key, serialize(type, props[key])]);
  }
  data.props.sort((a, b) => a[0].localeCompare(b[0]));
  return ["witness_set_properties", data];
}
