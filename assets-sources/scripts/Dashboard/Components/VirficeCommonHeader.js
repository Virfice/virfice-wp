import React from "react";
import { VIRFICE_APP_PREFIX } from "@conf";
import Container from "@molecules/Container";
import { BookOpen, EnvelopIcon, VirficeIcon } from "@svg-icons";
import Button from "@molecules/Button";
import { addParams } from "@functions";

const VirficeCommonHeader = () => {
  return (
    <>
      <section className={`${VIRFICE_APP_PREFIX}-landing-header-section`}>
        {!virfice.isWooActive && (
          <div
            style={{
              height: 70,
              background: "#FFE600",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 12,
              marginTop: -8,
              padding: "0 28px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M15.3463 8.16209C15.633 7.65235 16.3669 7.65235 16.6536 8.16209L24.3713 21.8823C24.6525 22.3822 24.2912 23 23.7176 23H8.28234C7.70872 23 7.34744 22.3822 7.62866 21.8823L15.3463 8.16209ZM16 12.3817C16.497 12.3817 16.9 12.7847 16.9 13.2817V16.3695C16.9 16.8666 16.497 17.2695 16 17.2695C15.5029 17.2695 15.1 16.8666 15.1 16.3695V13.2817C15.1 12.7847 15.5029 12.3817 16 12.3817ZM17.1 20C17.1 19.3925 16.6075 18.9 16 18.9C15.3924 18.9 14.9 19.3925 14.9 20V20.0685C14.9 20.6761 15.3924 21.1685 16 21.1685C16.6075 21.1685 17.1 20.6761 17.1 20.0685V20Z"
                  fill="black"
                  fill-opacity="0.8"
                />
              </svg>
              <span style={{ fontSize: 13, fontWeight: 500 }}>
                WooCommerce s required
              </span>
            </div>
            <span>
              To use this plugin WooCommerce is required, Please install &
              activate WooCommerce!
            </span>
            <Button
              type="outline"
              title="Install WooCommerce"
              link={virfice.wooPluginSearchUrl}
            />
          </div>
        )}
        <Container>
          <div
            className={`${VIRFICE_APP_PREFIX}-flex-space-between ${VIRFICE_APP_PREFIX}-flex-align-center`}
          >
            <div>
              <div style={{ height: 30 }}>
                <VirficeIcon />
              </div>
              <p>Email Customizer for WooCommerce</p>
            </div>
            <div>
              <Button
                type="plain"
                title="Explore guide!"
                link={"https://virfice.com/docs/"}
                leftIcon={<BookOpen />}
                target="_blank"
              />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default VirficeCommonHeader;
