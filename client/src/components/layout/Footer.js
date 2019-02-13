import React from "react";

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-sm-5">
            <h6 className="text-uppercase">Dev connector</h6>
            <p>{`@ Copyright ${new Date().getFullYear()}`}</p>
            <p>Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum</p>
          </div>
          <div className="col-sm-2">
            <h6 className="text-uppercase">follow us on</h6>
            <ul className="list-reset">
              <li>Instagram</li>
              <li>LinkedIn</li>
              <li>YouTube</li>
              <li>Twitter</li>
            </ul>
          </div>
          <div className="col-sm-5">
            <h6 className="text-uppercase">About us</h6>
            <p>
              Lacinia condimentum lectus dolor viverra nunc. Mauris quis
              condimentum orci. Curabitur hendrerit, felis vitae.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              est tellus, pulvinar ac iaculis vel, varius eu arcu tor
              vestibulum.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
